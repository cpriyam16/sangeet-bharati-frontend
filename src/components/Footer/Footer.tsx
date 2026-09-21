import BrandMark from '../BrandMark'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <BrandMark />
          <p>Celebrating the timeless language of music and dance.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li>Academics</li>
            <li>Events</li>
            <li>Faculty</li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li>hello@sangeetbharathi.in</li>
            <li>+91 98765 43210</li>
            <li>Bengaluru</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
