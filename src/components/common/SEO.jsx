import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_META = {
  '/': {
    title: 'HERDOS — Virtual Fencing & Early Illness Detection for Sheep & Goats',
    description: "HERDOS is India's first virtual fencing and early illness detection smart collar for sheep and goats.",
  },
  '/about/': {
    title: 'About | HERDOS — Our Story',
    description: 'The team and mission behind HERDOS — building the digital backbone for Indian livestock.',
  },
  '/technology/': {
    title: 'Technology | HERDOS — Smart Collar & Cloud Platform',
    description: 'Solar collar, GNSS connectivity, NB-IoT, and cloud intelligence powering HERDOS.',
  },
  '/solutions/': {
    title: 'Solutions | HERDOS — Virtual Fencing & Health Monitoring',
    description: 'HERDOS solutions for herding cost reduction, early illness detection, virtual fencing, and livestock security.',
  },
  '/goats/': {
    title: 'HERDOS for Goats — Grazing Control & Health Intelligence',
    description: 'Virtual fencing and early illness detection for goat herds. Built for browsing behaviour and herd dynamics.',
  },
  '/sheep/': {
    title: 'HERDOS for Sheep — Flock Management & Early Detection',
    description: 'Flock-aware grouping, virtual paddocks, and illness detection for sheep farmers.',
  },
  '/farmers/': {
    title: 'Farmer Stories | HERDOS',
    description: "Real stories from India's goat and sheep farmers building resilient herds with HERDOS.",
  },
  '/resources/': {
    title: 'Resources | HERDOS Blog & Learning Hub',
    description: 'Livestock technology articles, grazing guides, and the HERDOS learning hub.',
  },
  '/contact/': {
    title: 'Contact | HERDOS',
    description: 'Get in touch with the HERDOS team for demos, pilots, and technical support.',
  },
}

export default function SEO({ title, description }) {
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname] || PAGE_META['/']

  const finalTitle = title || meta.title
  const finalDesc = description || meta.description

  useEffect(() => {
    document.title = finalTitle
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', finalDesc)
  }, [finalTitle, finalDesc])

  return null
}
