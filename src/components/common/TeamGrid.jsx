export default function TeamGrid({ members }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {members.map((member) => (
        <article key={member.id} className="rounded-[28px] bg-white p-6 shadow-sm text-center">
          <div className="mx-auto mb-4 h-28 w-28 rounded-full bg-sage-50" aria-hidden="true">
            {member.photo ? <img src={member.photo} alt={member.photoAlt} className="h-full w-full rounded-full object-cover" /> : null}
          </div>
          <p className="font-semibold text-forest">{member.name}</p>
          <p className="mt-1 text-sm text-faint">{member.role}</p>
          <p className="mt-4 text-faint">{member.bio}</p>
        </article>
      ))}
    </div>
  )
}
