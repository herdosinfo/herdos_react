export default function FeatureGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-[32px] bg-white p-8 shadow-sm">
          {item.pill && <span className="pill pill--sage">{item.pill}</span>}
          <h3 className="t-h3 mt-5 text-forest">{item.title}</h3>
          <p className="mt-4 text-faint">{item.description}</p>
        </article>
      ))}
    </div>
  )
}
