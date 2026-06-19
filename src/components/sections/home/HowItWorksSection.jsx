import Reveal from '../../common/Reveal'

export default function HowItWorksSection() {
  return (
    <section className="section" id="how">
      <div className="container">
        <Reveal className="shead center">
          <span className="eyebrow">How it works</span>
          <h2 className="t-h2">Three stages. One intelligent collar.</h2>
        </Reveal>

        <div className="proc">
          <Reveal className="proc-step">
            <span className="proc-num">1</span>
            <h3>Detect</h3>
            <p>Collar sensors — jaw, posture, temperature and GNSS — continuously read each animal's state in the field.</p>
          </Reveal>
          <Reveal className="proc-step">
            <span className="proc-num">2</span>
            <h3>Decide</h3>
            <p>HERDOS Intelligence analyses the stream and decides if the animal is approaching a boundary or showing illness patterns.</p>
          </Reveal>
          <Reveal className="proc-step">
            <span className="proc-num">3</span>
            <h3>Guide / Alert</h3>
            <p>Progressive feedback — sound, vibration, safe pulse — for boundaries; instant app alerts for any health anomaly.</p>
          </Reveal>
        </div>

        <Reveal className="proc-video">
          <video src="/media/goat-wearing-herdos.mp4" autoPlay loop muted playsInline preload="none"></video>
          <div className="vcap">
            <h5><span className="live"></span> Live field feedback loop</h5>
            <p>The HERDOS collar in action — a lightweight, solar-harvesting harness delivering boundary cues and vitals telemetry.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
