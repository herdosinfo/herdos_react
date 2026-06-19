export default function SectionCard({ title, description, children }) {
  return (
    <div className="rounded-[32px] bg-sage-50 p-8 shadow-sm">
      <h3 className="t-h3 text-forest">{title}</h3>
      <p className="mt-4 text-faint">{description}</p>
      {children}
    </div>
  )
}
