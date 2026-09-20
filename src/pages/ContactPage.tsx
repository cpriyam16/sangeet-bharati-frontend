const contactDetails = [
  { label: 'Call us', value: '+91 98765 43210' },
  { label: 'Email', value: 'hello@sangeetbharathi.in' },
  { label: 'Visit', value: '12 Heritage Avenue, Bengaluru' },
]

function PageHero({ eyebrow, title, description }: Readonly<{ eyebrow: string; title: string; description: string }>) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-inner">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead-text">{description}</p>
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Begin your artistic journey with us"
        description="We would love to hear from you. Reach out for admissions, class schedules, events, and personalised guidance."
      />

      <section className="section-pad">
        <div className="container contact-grid">
          <div className="contact-card">
            <h3>Get in touch</h3>
            <form className="contact-form">
              <div className="form-floating">
                <input id="contact-name" type="text" placeholder="Your name" className="form-control" />
                <label htmlFor="contact-name">Name</label>
              </div>
              <div className="form-floating">
                <input id="contact-email" type="email" placeholder="Email address" className="form-control" />
                <label htmlFor="contact-email">Email</label>
              </div>
              <div className="form-floating">
                <textarea id="contact-message" placeholder="Tell us about your interest" className="form-control" rows={5} />
                <label htmlFor="contact-message">Message</label>
              </div>
              <button type="submit" className="btn btn-gold full-width">
                Send enquiry
              </button>
            </form>
          </div>

          <div className="contact-card contact-info">
            <h3>Visit or connect</h3>
            <ul>
              {contactDetails.map((detail) => (
                <li key={detail.label}>
                  <span>{detail.label}</span>
                  <strong>{detail.value}</strong>
                </li>
              ))}
            </ul>
            <div className="hours-box">
              <span className="label">Studio hours</span>
              <p>Mon–Sat: 9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
