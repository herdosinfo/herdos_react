export default function FAQList({ items }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details key={item.id} className="rounded-[28px] border border-sage-200 bg-sage-50 p-6">
          <summary className="cursor-pointer font-semibold text-forest">{item.question}</summary>
          <p className="mt-4 text-faint">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
