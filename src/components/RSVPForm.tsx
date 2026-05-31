import { useState } from 'react'
import './RSVPForm.css'

// Google Apps Script Web App endpoint (appends rows to the RSVP sheet)
const SUBMIT_URL =
  'https://script.google.com/macros/s/AKfycbyQx8vUq0x5XSWD5jXnDO1EFFJReEVmk1q_hxxNeJZHMAB4oF3u_8SGL6aeejfMzFsr/exec'

type Attending = 'yes' | 'maybe' | 'no'
type Mood = 'food' | 'dancing' | 'love' | 'all'

type Errors = Partial<Record<'name' | 'phone' | 'guests', string>>

const MOODS: { value: Mood; label: string; icon: string }[] = [
  { value: 'food', label: 'Food', icon: '🍽️' },
  { value: 'dancing', label: 'Dancing', icon: '💃' },
  { value: 'love', label: 'Love', icon: '💖' },
  { value: 'all', label: 'All of it', icon: '✨' },
]

const validate = (name: string, phone: string, guests: number): Errors => {
  const errs: Errors = {}
  if (!name.trim()) errs.name = 'Name is required'
  else if (name.trim().length < 2) errs.name = 'Please tell us your full name'

  const phoneDigits = phone.replace(/\D/g, '')
  if (!phone.trim()) errs.phone = 'Phone is required'
  else if (phoneDigits.length !== 10) errs.phone = 'Phone must be exactly 10 digits'

  if (Number.isNaN(guests) || guests < 0 || guests > 10) errs.guests = '0–10 guests'
  return errs
}

const RSVPForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [attending, setAttending] = useState<Attending>('yes')
  const [guests, setGuests] = useState(1)
  const [mood, setMood] = useState<Mood>('all')
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[RSVP] submit triggered')

    const errs = validate(name, phone, guests)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      console.warn('[RSVP] validation failed', errs)
      return
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guests,
      mood,
      submittedAt: new Date().toISOString(),
    }
    console.log('[RSVP] payload', payload)

    setSubmitting(true)
    setSubmitError(null)
    try {
      if (!SUBMIT_URL) {
        console.warn('[RSVP] no SUBMIT_URL configured, simulating success')
        await new Promise((r) => setTimeout(r, 500))
      } else {
        // Apps Script /exec redirects to script.googleusercontent.com. To
        // survive the redirect AND avoid CORS preflight, we POST the JSON as
        // url-encoded form data with text/plain content-type, which fetch
        // treats as a "simple request" (no OPTIONS preflight).
        const body = new URLSearchParams({ payload: JSON.stringify(payload) })
        console.log('[RSVP] POSTing to', SUBMIT_URL)
        await fetch(SUBMIT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body,
        })
        console.log('[RSVP] fetch resolved')
      }
      setSubmitted(true)
    } catch (err) {
      setSubmitError('Could not send right now. Please try again.')
      console.error('[RSVP] submit failed:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="rsvp section" id="rsvp">
        <div className="rsvp-thank">
          <div className="rsvp-check">✓</div>
          <h2 className="section-title">Thank You!</h2>
          <p className="rsvp-thank-text">
            Your response has been recorded.
            <br />
            We can't wait to celebrate with you.
          </p>
          <p className="rsvp-sign">— Dattatray &amp; Pooja</p>
        </div>
      </section>
    )
  }

  return (
    <section className="rsvp section" id="rsvp">
      <p className="section-subtitle">RSVP</p>
      <h2 className="section-title">Will you be there?</h2>
      <div className="divider">
        <span className="divider-icon">✦</span>
      </div>
      <p className="rsvp-deadline">Kindly let us know by 1st February 2027.</p>

      <form onSubmit={handleSubmit} className="rsvp-form" noValidate>
        <div className="rsvp-field">
          <label htmlFor="rsvp-name">Your Name</label>
          <input
            id="rsvp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="rsvp-error">{errors.name}</span>}
        </div>

        {/* <div className="rsvp-field">
          <label htmlFor="rsvp-phone">Phone</label>
          <input
            id="rsvp-phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="97654XXXXX"
            autoComplete="tel-national"
            maxLength={10}
            required
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <span className="rsvp-error">{errors.phone}</span>}
        </div> */}

        <div className="rsvp-row">
          <div className="rsvp-field">
            <label htmlFor="rsvp-attending">Attending?</label>
            <select
              id="rsvp-attending"
              value={attending}
              onChange={(e) => setAttending(e.target.value as Attending)}
            >
              <option value="yes">Joyfully accepts</option>
              <option value="maybe">Trying my best</option>
              <option value="no">Regretfully declines</option>
            </select>
          </div>

          <div className="rsvp-field">
            <label htmlFor="rsvp-guests">Number of guests</label>
            <input
              id="rsvp-guests"
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              aria-invalid={!!errors.guests}
            />
            {errors.guests && <span className="rsvp-error">{errors.guests}</span>}
          </div>
        </div>

        {/* <div className="rsvp-field">
          <label>What are you here for?</label>
          <div className="mood-grid">
            {MOODS.map((m) => (
              <button
                key={m.value}
                type="button"
                className={`mood-chip ${mood === m.value ? 'active' : ''}`}
                onClick={() => setMood(m.value)}
                aria-pressed={mood === m.value}
              >
                <span className="mood-icon">{m.icon}</span>
                <span className="mood-label">{m.label}</span>
              </button>
            ))}
          </div>
        </div> */}

        {submitError && <p className="rsvp-submit-error">{submitError}</p>}

        <button type="submit" className="btn rsvp-submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send RSVP'}
        </button>
      </form>
    </section>
  )
}

export default RSVPForm
