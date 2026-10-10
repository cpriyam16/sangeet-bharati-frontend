import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../navigationItems'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={`main-nav${isOpen ? ' is-open' : ''}`} aria-label="Main navigation">
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="main-navigation-links"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="menu-icon" aria-hidden="true" />
      </button>
      <div className="main-nav-links" id="main-navigation-links">
        {navItems.map((navItem) => (
          <NavLink
            key={navItem.to}
            to={navItem.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setIsOpen(false)}
          >
            {navItem.label}
          </NavLink>
        ))}
        <NavLink to="/contact" className="btn btn-gold navbar-cta" onClick={() => setIsOpen(false)}>
          Contact Us
        </NavLink>
      </div>
    </nav>
  )
}
