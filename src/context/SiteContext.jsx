import { createContext, useContext, useState } from 'react'

const SiteContext = createContext()

export function SiteProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  return (
    <SiteContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSite must be used within SiteProvider')
  }
  return context
}
