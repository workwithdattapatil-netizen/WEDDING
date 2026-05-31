import './Ceremonies.css'

type Ceremony = {
  name: string
  date: string
  day: string
  time: string
  venue: string
  mapUrl: string
  icon: string
  tag?: string
  tagIcon?: string
}

const ceremonies: Ceremony[] = [
  {
    name: 'Haldi',
    tag: "Groom's Side",
    tagIcon: '🤵',
    date: '14th February 2027',
    day: 'Sunday',
    time: '10:00 AM onwards',
    venue: 'Patil Residence',
    mapUrl: 'https://maps.app.goo.gl/71JS7ABT9pyN22qEA?g_st=ac',
    icon: '🌼',
  },
  {
    name: 'Haldi',
    tag: "Bride's Side",
    tagIcon: '👰',
    date: '14th February 2027',
    day: 'Sunday',
    time: '11:00 AM onwards',
    venue: 'Kesarkar Residence',
    mapUrl: 'https://maps.app.goo.gl/mxVdpQaZrhtoacwt9',
    icon: '🌼',
  },
  {
    name: 'Marriage',
    date: '25th February 2027',
    day: 'Monday',
    time: '11:53 AM onwards',
    venue: 'Wedding Hall',
    mapUrl: 'https://maps.app.goo.gl/Z331PfyYtMkzTo486?g_st=ac',
    icon: '💍',
  },
]

const Ceremonies = () => {
  return (
    <section className="ceremonies section">
      <p className="section-subtitle">Wedding Events</p>
      <h2 className="section-title">Ceremonies</h2>
      <div className="divider">
        <span className="divider-icon">✦</span>
      </div>

      <div className="timeline">
        {ceremonies.map((c, i) => (
          <div className="timeline-item" key={`${c.name}-${i}`}>
            <div className="timeline-dot">
              <span className="dot-icon">{c.icon}</span>
            </div>
            {i < ceremonies.length - 1 && <div className="timeline-line" />}

            <div className="ceremony-card">
              <div className="ceremony-header">
                <h3 className="ceremony-name">{c.name}</h3>
                {c.tag && (
                  <span className="ceremony-tag">
                    {c.tagIcon && <span className="tag-icon">{c.tagIcon}</span>}
                    {c.tag}
                  </span>
                )}
              </div>
              <p className="ceremony-day">{c.day}</p>
              <p className="ceremony-date">{c.date}</p>
              <p className="ceremony-time">{c.time}</p>
              <div className="ceremony-divider" />
              <p className="ceremony-venue">{c.venue}</p>
              <a
                href={c.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="map-link"
              >
                <span className="map-pin">📍</span> View on Map
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Ceremonies
