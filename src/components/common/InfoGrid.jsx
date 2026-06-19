export default function InfoGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-[32px] bg-white p-8 shadow-sm">
          <h3 className="t-h3 text-forest">{item.title}</h3>
          <p className="mt-4 text-faint">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
