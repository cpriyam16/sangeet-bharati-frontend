import { NavLink } from 'react-router-dom'
import BrandMark from '../BrandMark'
import Navbar from '../Navbar/Navbar'

export default function Header() {
  return (
    <header className="topbar">
      <div className="container nav-inner">
        <NavLink to="/" className="brand-link" aria-label="Sangeet Bharathi home page">
          <BrandMark />
        </NavLink>

        <Navbar />
      </div>
    </header>
  )
}
