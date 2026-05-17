import { useEffect, useRef, useState } from 'react'
import './BackgroundMusic.css'

const VIDEO_ID = '-2w18bd-ZQ4'
const START_SECONDS = 10

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

const BackgroundMusic = () => {
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const createPlayer = () => {
      if (!containerRef.current || !window.YT?.Player) return
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          start: START_SECONDS,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.mute()
            event.target.seekTo(START_SECONDS, true)
            event.target.playVideo()
            setReady(true)
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(START_SECONDS, true)
              event.target.playVideo()
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      )
      if (!existing) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }
      window.onYouTubeIframeAPIReady = createPlayer
    }

    return () => {
      try {
        playerRef.current?.destroy?.()
      } catch {
        /* noop */
      }
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const unmuteOnInteract = () => {
      const player = playerRef.current
      if (!player) return
      try {
        player.unMute()
        player.setVolume(60)
        player.playVideo()
        setMuted(false)
      } catch {
        /* noop */
      }
      removeListeners()
    }
    const events: Array<keyof DocumentEventMap> = [
      'pointerdown',
      'click',
      'touchstart',
      'keydown',
      'scroll',
    ]
    const removeListeners = () => {
      events.forEach((e) =>
        window.removeEventListener(e, unmuteOnInteract, true),
      )
    }
    events.forEach((e) =>
      window.addEventListener(e, unmuteOnInteract, { capture: true, once: false }),
    )
    return removeListeners
  }, [ready])

  const toggleMute = () => {
    const player = playerRef.current
    if (!player || !ready) return
    if (muted) {
      player.unMute()
      player.setVolume(60)
      player.playVideo()
      setMuted(false)
    } else {
      player.mute()
      setMuted(true)
    }
  }

  return (
    <>
      <div className="bg-music-frame" aria-hidden="true">
        <div ref={containerRef} />
      </div>
      <button
        type="button"
        className="bg-music-toggle"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
        title={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </>
  )
}

export default BackgroundMusic
