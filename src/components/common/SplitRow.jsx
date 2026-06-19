import Reveal from './Reveal'

export default function SplitRow({
  flip = false,
  pill,
  headline,
  lead,
  children,
  media,
  id,
}) {
  return (
    <section id={id} className="section">
      <div className={`container grid gap-10 lg:grid-cols-2 lg:items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {/* Text side */}
        <Reveal>
          <div className="split-text">
            {pill && <span className="pill pill--sage mb-4 inline-flex">{pill}</span>}
            <h2 className="t-h2 text-forest">{headline}</h2>
            {lead && <p className="t-lead mt-4 text-muted max-w-xl">{lead}</p>}
            {children && <div className="mt-6">{children}</div>}
          </div>
        </Reveal>
        {/* Media side */}
        {media && (
          <Reveal delay={0.12}>
            <div className="rounded-xl overflow-hidden shadow-lg">
              {media}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
