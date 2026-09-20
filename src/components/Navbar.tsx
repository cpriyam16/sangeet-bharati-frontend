import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      {navItems.map((navItem) => (
        <NavLink
          key={navItem.to}
          to={navItem.to}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {navItem.label}
        </NavLink>
      ))}
    </nav>
  )
}
