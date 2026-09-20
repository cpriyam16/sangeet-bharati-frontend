import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import singingImage from '../assets/images/singing.jpg'
import facultyImage from '../assets/images/faculty.jpg'
import purandaraImage from '../assets/images/purandara-program.png'
import concertImage from '../assets/images/sbicm-concert.jpg'

const stats = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '3500+', label: 'Students Mentored' },
  { value: '40+', label: 'Workshops & Concerts' },
  { value: '6', label: 'Art Forms Taught' },
]

const programs = [
  {
    icon: '🎻',
    title: 'Hindustani Classical',
    copy: 'Structured learning in vocals, rhythm, and theory led by seasoned gurus and performing artists.',
  },
  {
    icon: '💃',
    title: 'Dance & Expression',
    copy: 'Graceful training in Bharatanatyam, dance forms, stage choreography, and expressive movement.',
  },
  {
    icon: '🎼',
    title: 'Music Appreciation',
    copy: 'Immersive appreciation modules for children, families, and beginners discovering Indian music.',
  },
  {
    icon: '🏆',
    title: 'Performance Pathways',
    copy: 'Mentoring for stage readiness, recitals, and cultural festivals with confidence and polish.',
  },
]

const values = [
  {
    title: 'Traditional Depth',
    copy: 'We preserve the authenticity of Indian arts while making them relevant for modern life and learning.',
  },
  {
    title: 'Holistic Growth',
    copy: 'Discipline, confidence, creativity, and mindfulness are woven into every class and recital.',
  },
  {
    title: 'Inclusive Community',
    copy: 'Students of every age and background are welcomed into a vibrant, encouraging cultural space.',
  },
]

const testimonials = [
  {
    quote:
      'The faculty nurtures both artistry and discipline. My daughter grew in confidence and expression within months.',
    author: 'Shreya P.',
    role: 'Parent of a beginner vocalist',
  },
  {
    quote:
      'Sangeet Bharathi feels like a family where tradition is respected, creativity is encouraged, and excellence is expected.',
    author: 'Amit R.',
    role: 'Music enthusiast',
  },
]

const heroSlides = [
  {
    kicker: 'Live recitals',
    title: 'Classical excellence with contemporary energy',
    caption: 'Discover an immersive learning experience shaped by artistry, discipline, and performance.',
    image: singingImage,
  },
  {
    kicker: 'Faculty-led mentorship',
    title: 'Guidance rooted in tradition and innovation',
    caption: 'Learn from master teachers whose practice balances technical mastery with expressive freedom.',
    image: facultyImage,
  },
  {
    kicker: 'Cultural festivals',
    title: 'A vibrant community of musicians and dancers',
    caption: 'Celebrate heritage through curated events, student showcases, and communal appreciation.',
    image: purandaraImage,
  },
  {
    kicker: 'Award moments',
    title: 'Recognised for artistry and commitment to excellence',
    caption: 'From workshops to stage performances, every milestone reflects our passion for Indian arts.',
    image: concertImage,
  },
]

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <>
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">A legacy of artistry, learning, and performance</p>
            <h1>Where music, movement, and culture find their rhythm.</h1>
            <p className="lead-text">
              Sangeet Bharathi is an institution devoted to nurturing India's artistic traditions with
              contemporary learning, excellence in mentorship, and a vibrant community spirit.
            </p>
            <div className="cta-row">
              <NavLink to="/about" className="btn btn-gold">
                Explore the legacy
              </NavLink>
              <NavLink to="/contact" className="btn btn-outline-light dark-outline">
                Book a consultation
              </NavLink>
            </div>
            <div className="mini-stat-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="mini-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-carousel-panel" aria-label="Featured institutional highlights">
            <div className="carousel-slides">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`carousel-slide ${index === activeSlide ? 'is-active' : ''}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="slide-overlay">
                    <span className="slide-kicker">{slide.kicker}</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-dots" aria-label="Carousel navigation">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={index === activeSlide ? 'dot active' : 'dot'}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-soft">
        <div className="container">
          <div className="section-heading text-center">
            <p className="eyebrow">Our strengths</p>
            <h2>Programs that awaken talent and build character</h2>
          </div>
          <div className="card-grid four-up">
            {programs.map((program) => (
              <div className="info-card" key={program.title}>
                <div className="icon-badge">{program.icon}</div>
                <h3>{program.title}</h3>
                <p>{program.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Why families choose us</p>
            <h2>Art education shaped by authenticity, discipline, and joy</h2>
            <p className="muted-copy">
              We make artistic excellence approachable and meaningful. Every student receives personal
              attention, performance opportunities, and guidance rooted in traditional values.
            </p>
          </div>
          <div className="value-stack">
            {values.map((value, index) => (
              <div className="value-item" key={value.title}>
                <span className="value-number">0{index + 1}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-contrast">
        <div className="container">
          <div className="section-heading text-center">
            <p className="eyebrow">Parents speak</p>
            <h2>Trusted by families who value culture and growth</h2>
          </div>
          <div className="card-grid three-up">
            {testimonials.map((item) => (
              <blockquote className="quote-card" key={item.author}>
                <p>“{item.quote}”</p>
                <footer>
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
