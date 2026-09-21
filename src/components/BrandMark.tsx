import logo from '../assets/images/sangeet-bharathi-logo.svg'

export default function BrandMark() {
  return (
    <div className="brand-mark" aria-label="Sangeet Bharathi logo">
      <img src={logo} alt="Sangeet Bharathi" className="brand-round" />
      <div className="brand-copy">
        <span className="brand-name">Sangeet Bharathi</span>
        <span className="brand-subtitle">Indian Classical Music</span>
      </div>
    </div>
  )
}
