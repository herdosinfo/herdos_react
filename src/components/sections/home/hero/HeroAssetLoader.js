export default class HeroAssetLoader {
  constructor({ video, image, onReady }) {
    this.video = video
    this.image = image
    this.onReady = onReady
    this.cancelled = false
    this.rafId = null
    this._videoTimeoutId = null
    this._videoCleanup = null
  }

  load() {
    // Stage 1: Freeze layout/scrolling before starting load
    document.documentElement.classList.add('hero-loading')
    document.documentElement.style.overflow = 'hidden'

    // Set initial video state: never autoplay, never advance automatically
    this.video.pause()
    this.video.currentTime = 0

    // Stage 2: Wait for video canplaythrough, image decode, and fonts
    //
    // CRITICAL: The video promise must never hang forever. On production CDNs
    // the video may load slowly, stall, or fail entirely. We add:
    //   1. A maximum wait timeout (8 seconds)
    //   2. Error / stalled event handlers
    // If the video isn't ready in time, we resolve anyway — the scroll
    // controller already handles low readyState gracefully
    // (HeroScrollController line 90: `if (this.video.readyState >= 2)`).
    const VIDEO_TIMEOUT_MS = 8000

    const videoReady = new Promise(resolve => {
      // Already buffered (common on revisit / cache hit)
      if (this.video.readyState >= 4) {
        resolve()
        return
      }

      let settled = false
      const settle = () => {
        if (settled) return
        settled = true
        cleanup()
        resolve()
      }

      const onCanPlayThrough = () => settle()
      const onError = () => settle()
      const onStalled = () => settle()

      this.video.addEventListener('canplaythrough', onCanPlayThrough)
      this.video.addEventListener('error', onError)
      this.video.addEventListener('stalled', onStalled)

      // Safety timeout — resolve even if no event fires
      this._videoTimeoutId = setTimeout(settle, VIDEO_TIMEOUT_MS)

      const cleanup = () => {
        this.video.removeEventListener('canplaythrough', onCanPlayThrough)
        this.video.removeEventListener('error', onError)
        this.video.removeEventListener('stalled', onStalled)
        clearTimeout(this._videoTimeoutId)
        this._videoTimeoutId = null
      }

      // Expose cleanup so cancel() can tear down listeners
      this._videoCleanup = cleanup
    })

    const imageReady = new Promise(resolve => {
      if (this.image.complete) {
        if (this.image.decode) {
          this.image.decode().catch(() => {}).then(resolve)
        } else {
          resolve()
        }
      } else {
        const onLoad = () => {
          this.image.removeEventListener('load', onLoad)
          this.image.removeEventListener('error', onError)
          if (this.image.decode) {
            this.image.decode().catch(() => {}).then(resolve)
          } else {
            resolve()
          }
        }
        const onError = () => {
          this.image.removeEventListener('load', onLoad)
          this.image.removeEventListener('error', onError)
          resolve()
        }
        this.image.addEventListener('load', onLoad)
        this.image.addEventListener('error', onError)
      }
    })

    const fontsReady = document.fonts.ready

    Promise.all([videoReady, imageReady, fontsReady]).then(() => {
      if (this.cancelled) return

      // Stage 3: Wait for layout to finish settling (one rAF)
      this.rafId = requestAnimationFrame(() => {
        if (this.cancelled) return

        // Measure Hero dimensions and viewport
        const bounds = {
          heroHeight: this.video.parentElement ? this.video.parentElement.offsetHeight : window.innerHeight,
          viewportHeight: window.innerHeight,
          videoDuration: this.video.duration || 0
        }

        // Freeze layout
        document.documentElement.classList.add('layout-frozen')

        // Let the scroll controller know we are ready
        this.onReady(bounds)
      })
    })
  }

  cancel() {
    this.cancelled = true
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    // Clean up video listeners and timeout
    if (this._videoCleanup) {
      this._videoCleanup()
      this._videoCleanup = null
    }
    document.documentElement.classList.remove('hero-loading')
    document.documentElement.classList.remove('layout-frozen')
    document.documentElement.style.overflow = ''
  }
}
