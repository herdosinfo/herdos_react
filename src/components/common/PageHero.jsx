import Reveal from './Reveal'

export default function PageHero({ pill, h1, lead, children, variant = 'center', dark = false }) {
  const bgClass = dark
    ? 'section--dark section'
    : 'section'

  const textAlign = variant === 'center' ? 'text-center mx-auto max-w-4xl' : ''

  return (
    <section className={`${bgClass} subhero`}>
      <div className={`container ${variant === 'center' ? 'flex flex-col items-center' : ''}`}>
        <Reveal className={textAlign}>
          {pill && (
            <span className="pill pill--gold mb-5 inline-flex">{pill}</span>
          )}
          {h1 && (
            <h1 className={`t-display ${dark ? 'text-white' : 'text-forest'} ${variant === 'center' ? '' : 'max-w-3xl'}`}>
              {h1}
            </h1>
          )}
          {lead && (
            <p className={`t-lead mt-5 ${dark ? 'text-white/70' : 'text-muted'} ${variant === 'center' ? 'max-w-2xl' : 'max-w-xl'}`}>
              {lead}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  )
}
