import { gsap, ScrollTrigger } from '../../../../lib/gsap'

export default class HeroScrollController {
  constructor({
    shell,
    container,
    video,
    heroImg,
    tagline,
    taglineScroll,
    videoDuration,
    onReady
  }) {
    this.shell = shell
    this.container = container
    this.video = video
    this.heroImg = heroImg
    this.tagline = tagline
    this.taglineScroll = taglineScroll
    this.videoDuration = videoDuration
    this.onReady = onReady
    this.tl = null
  }

  init() {
    const VIDEO_START = 0
    const VIDEO_END = 7.0
    const XFADE_END = 8.5
    const LABEL = 'imageSettled'
    const TAGLINE_SCROLL_DUR = 0.8
    const TAGLINE_DUR = 1.5
    const XFADE_DUR = XFADE_END - VIDEO_END

    // Reset initial states strictly before constructing timeline
    gsap.set(this.tagline, { opacity: 1, y: 0 })
    gsap.set(this.taglineScroll, { opacity: 1, y: 0 })
    gsap.set(this.video, { scale: 1.0, y: 0, opacity: 1 })
    gsap.set(this.heroImg, { opacity: 0, scale: 1.05, filter: 'blur(6px)' })

    gsap.set('.hero-eyebrow', { opacity: 0, y: 20 })
    gsap.set('.hero-word', { y: '115%' }) // inside overflow:hidden mask
    gsap.set('.hero-desc', { opacity: 0, y: 20 })
    gsap.set('.hero-cta-btn', { opacity: 0, y: 20, scale: 0.92 })
    gsap.set('.hero-trust-item', { opacity: 0, y: 15 })

    // Build timeline completely once
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.shell,
        start: 'top top',
        end: '+=190%',
        pin: this.container,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    // Segment 1 — Early exit: scroll cue & center tagline
    this.tl.to(this.taglineScroll, {
      opacity: 0,
      y: -12,
      duration: TAGLINE_SCROLL_DUR,
      ease: 'power1.out',
    }, 0)

    this.tl.to(this.tagline, {
      opacity: 0,
      y: -35,
      duration: TAGLINE_DUR,
      ease: 'power1.inOut',
    }, 0)

    // Segment 2 — Video scrub Ken Burns scale/parallax
    this.tl.to(this.video, {
      scale: 1.08,
      y: -30,
      ease: 'none',
      duration: VIDEO_END - VIDEO_START,
    }, VIDEO_START)

    // Video scrub currentTime control
    const videoProxy = { time: 0 }
    this.tl.to(videoProxy, {
      time: this.videoDuration,
      ease: 'none',
      duration: VIDEO_END - VIDEO_START,
      onUpdate: () => {
        if (this.video.readyState >= 2) {
          const next = videoProxy.time
          const delta = Math.abs(next - (this.video.currentTime || 0))
          if (delta > 0.016) {
            this.video.currentTime = next
          }
        }
      }
    }, VIDEO_START)

    // Segment 3 — Crossfade: video → hero image
    this.tl.to(this.video, {
      opacity: 0,
      ease: 'power2.inOut',
      duration: XFADE_DUR,
    }, VIDEO_END)

    this.tl.to(this.heroImg, {
      opacity: 1,
      scale: 1.0,
      filter: 'blur(0px)',
      ease: 'power2.out',
      duration: XFADE_DUR,
    }, VIDEO_END)

    this.tl.addLabel(LABEL, XFADE_END)

    // Segment 4 — Content reveals
    this.tl.to('.hero-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, `${LABEL}+=0.2`)

    const line1Words = gsap.utils.toArray('.hero-word-line1')
    this.tl.to(line1Words, {
      y: '0%',
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
    }, `${LABEL}+=0.8`)

    const line2Words = gsap.utils.toArray('.hero-word-line2')
    this.tl.to(line2Words, {
      y: '0%',
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
      onComplete: () => {
        // Double check position to ensure no layout drift on quick scrolls
        ScrollTrigger.refresh()
      }
    }, `${LABEL}+=1.8`)

    this.tl.to('.hero-desc', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.out',
    }, `${LABEL}+=2.8`)

    this.tl.to('.hero-cta-btn', {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.12,
      duration: 1.0,
      ease: 'back.out(1.2)',
    }, `${LABEL}+=3.6`)

    const trustItems = gsap.utils.toArray('.hero-trust-item')
    this.tl.to(trustItems, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: 'power2.out',
    }, `${LABEL}+=4.4`)

    // Notify ready
    this.onReady()
  }

  destroy() {
    if (this.tl) {
      this.tl.kill()
      this.tl = null
    }
  }
}
