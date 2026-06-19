export default function ContentSplit({ left, right }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}
