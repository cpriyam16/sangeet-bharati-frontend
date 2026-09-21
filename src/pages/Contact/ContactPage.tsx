import { useState, type FormEvent } from 'react'
import { useFormValidation } from '../../hooks/useFormValidation'
import { composeValidators, email, minLength, required } from '../../utils/validation'

const contactDetails = [
  { label: 'Call us', value: '+91 98765 43210' },
  { label: 'Email', value: 'hello@sangeetbharathi.in' },
  { label: 'Visit', value: '12 Heritage Avenue, Bengaluru' },
]

type ContactField = 'name' | 'email' | 'message'

const contactRules = {
  name: required('Please enter your name'),
  email: composeValidators(required('Please enter your email'), email()),
  message: composeValidators(required('Please tell us how we can help'), minLength(10)),
}

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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { values, errors, handleChange, handleBlur, validateAll, reset } = useFormValidation<ContactField>(
    { name: '', email: '', message: '' },
    contactRules,
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateAll()) {
      setIsSubmitted(true)
      reset()
    }
  }

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
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-floating">
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  className={`form-control${errors.name ? ' is-invalid' : ''}`}
                  value={values.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  onBlur={() => handleBlur('name')}
                />
                <label htmlFor="contact-name">Name</label>
              </div>
              {errors.name ? <p className="field-error">{errors.name}</p> : null}

              <div className="form-floating">
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Email address"
                  className={`form-control${errors.email ? ' is-invalid' : ''}`}
                  value={values.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  onBlur={() => handleBlur('email')}
                />
                <label htmlFor="contact-email">Email</label>
              </div>
              {errors.email ? <p className="field-error">{errors.email}</p> : null}

              <div className="form-floating">
                <textarea
                  id="contact-message"
                  placeholder="Tell us about your interest"
                  className={`form-control${errors.message ? ' is-invalid' : ''}`}
                  rows={5}
                  value={values.message}
                  onChange={(event) => handleChange('message', event.target.value)}
                  onBlur={() => handleBlur('message')}
                />
                <label htmlFor="contact-message">Message</label>
              </div>
              {errors.message ? <p className="field-error">{errors.message}</p> : null}

              {isSubmitted ? <p className="booking-success">Thanks for reaching out. We will respond shortly.</p> : null}

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
