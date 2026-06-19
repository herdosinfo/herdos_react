export default function TestimonialGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="rounded-[32px] bg-white p-6 shadow-sm">
          <img src={item.photo} alt={item.photoAlt} className="h-44 w-full rounded-[24px] object-cover" />
          <p className="mt-5 text-faint">“{item.quote}”</p>
          <div className="mt-5 border-t border-sage-200 pt-4">
            <p className="font-semibold text-forest">{item.name}</p>
            <p className="text-sm text-faint">{item.location} · {item.meta}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
