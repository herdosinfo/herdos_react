export default class HeroAssetLoader {
  constructor({ video, image, onReady }) {
    this.video = video
    this.image = image
    this.onReady = onReady
    this.cancelled = false
    this.rafId = null
  }

  load() {
    // Stage 1: Freeze layout/scrolling before starting load
    document.documentElement.classList.add('hero-loading')
    document.documentElement.style.overflow = 'hidden'

    // Set initial video state: never autoplay, never advance automatically
    this.video.pause()
    this.video.currentTime = 0

    // Stage 2: Wait for video canplaythrough, image decode, and fonts
    const videoReady = new Promise(resolve => {
      if (this.video.readyState >= 4) {
        resolve()
      } else {
        const onCanPlayThrough = () => {
          this.video.removeEventListener('canplaythrough', onCanPlayThrough)
          resolve()
        }
        this.video.addEventListener('canplaythrough', onCanPlayThrough)
      }
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
    document.documentElement.classList.remove('hero-loading')
    document.documentElement.classList.remove('layout-frozen')
    document.documentElement.style.overflow = ''
  }
}
