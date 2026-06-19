import { NAV } from '../../data/navigation'
import { Link } from 'react-router-dom'

export default function MegaMenu() {
  return (
    <div className="absolute left-0 top-full mt-2 w-full bg-white shadow-md border-t border-sage-100 z-40">
      <div className="container grid gap-6 py-8 md:grid-cols-6">
        {NAV.map((sec) => (
          <div key={sec.id} className="md:col-span-1">
            <h4 className="font-semibold text-forest mb-3">{sec.label}</h4>
            {sec.cols && sec.cols.map((col, idx) => (
              <div key={idx} className="mb-4">
                <p className="text-sm font-medium text-faint">{col.title}</p>
                <ul className="mt-2 space-y-2">
                  {col.items.map((it, i) => (
                    <li key={i}>
                      <Link to={it[0]} className="text-sm text-forest/80">{it[1]}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
