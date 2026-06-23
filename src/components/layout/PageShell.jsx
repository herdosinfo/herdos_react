import Header from './Header'
import Footer from './Footer'
import FarmerHelpline from './FarmerHelpline'

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <FarmerHelpline />
      <Footer />
    </div>
  )
}
