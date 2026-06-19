import Reveal from '../../common/Reveal'

const ICON = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function KeyFeaturesSection() {
  return (
    <section className="section section--sage" id="features">
      <div className="container">
        <Reveal className="shead">
          <span className="eyebrow">Key Features</span>
          <h2 className="t-h2">Everything you need on one collar.</h2>
        </Reveal>

        {/* Row 1 */}
        <Reveal className="kf-row">
          <div className="kf-media">
            <img src="/media/fencing.png" alt="Drawing a virtual paddock in the HERDOS app" />
          </div>
          <div className="kf-text">
            <span className="eyebrow">Virtual Fencing & Shifting</span>
            <h2 className="t-h3">Move the paddock from your phone.</h2>
            <p className="t-lead">
              Create grazing zones on a live map and reshape them in minutes — animals learn the
              boundary through a gentle, progressive guidance system.
            </p>
            <ul className="kf-list">
              <li>{ICON.check} Breed-specific warning call</li>
              <li>{ICON.check} Vibration cue</li>
              <li>{ICON.check} Safe mild electric pulse</li>
              <li>{ICON.check} Panic detection</li>
              <li>{ICON.check} Exclusion zones</li>
              <li>{ICON.check} Return-to-paddock guidance</li>
            </ul>
          </div>
        </Reveal>

        {/* Row 2 */}
        <Reveal className="kf-row reverse">
          <div className="kf-media">
            <img src="/media/collar-detail.png" alt="HERDOS collar sensor detail" />
          </div>
          <div className="kf-text">
            <span className="eyebrow">Early Illness Detection</span>
            <h2 className="t-h3">See the fever before the symptom.</h2>
            <p className="t-lead">
              Precision sensors read each animal's normal — and tell you the moment behaviour drifts,
              so you can act early and lose fewer animals.
            </p>
            <ul className="kf-list">
              <li>{ICON.check} Jaw movement</li>
              <li>{ICON.check} Body posture</li>
              <li>{ICON.check} Body temperature</li>
              <li>{ICON.check} Rumination tracking</li>
              <li>{ICON.check} Grazing activity</li>
              <li>{ICON.check} Sleep patterns</li>
            </ul>
          </div>
        </Reveal>

        {/* Row 3 */}
        <Reveal className="kf-row">
          <div className="kf-media">
            <img src="/media/app-dash.png" alt="HERDOS mobile app dashboard" />
          </div>
          <div className="kf-text">
            <span className="eyebrow">HERDOS Mobile App</span>
            <h2 className="t-h3">The whole herd, in your pocket.</h2>
            <p className="t-lead">
              Built for everyday farm use — in Hindi, Marathi, Tamil, Telugu and Kannada, with
              voice-assisted guidance for every literacy level.
            </p>
            <ul className="kf-list">
              <li>{ICON.check} Live map with zones</li>
              <li>{ICON.check} Exclusion-zone config</li>
              <li>{ICON.check} Real-time tracking + history</li>
              <li>{ICON.check} Find Animal mode</li>
              <li>{ICON.check} Anti-tamper alerts</li>
              <li>{ICON.check} 5 regional languages</li>
            </ul>
          </div>
        </Reveal>

        {/* Row 4 */}
        <Reveal className="kf-row reverse">
          <div className="kf-media">
            <img src="/media/connectivity.png" alt="HERDOS connectivity: GNSS, NB-IoT, LoRa gateway" />
          </div>
          <div className="kf-text">
            <span className="eyebrow">Connectivity Anywhere</span>
            <h2 className="t-h3">Works where the network ends.</h2>
            <p className="t-lead">
              From open pasture to remote hills, HERDOS keeps reporting — falling back to a private
              LoRa network when there's no cellular signal.
            </p>
            <ul className="kf-list">
              <li>{ICON.check} Multi-constellation GNSS</li>
              <li>{ICON.check} NB-IoT for cellular zones</li>
              <li>{ICON.check} LoRa private network</li>
              <li>{ICON.check} Portable solar gateway</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
