import { useEffect, useState, type FormEvent } from 'react'
import MainImage from '../../assets/images/main.jpg'
import canadianTalentImage from '../../assets/images/online-concert.jpg'
import mashurasthakaImage from '../../assets/images/mashurasthaka.jpg'
import sandArtistImage from '../../assets/images/sand-artist.png'
import { useFormValidation } from '../../hooks/useFormValidation'
import { composeValidators, email, notPast, phone, required, type FieldErrors } from '../../utils/validation'

const faculty = [
  {
    name: 'Vinayak Hegde',
    role: 'Hindustani Vocal Faculty',
    bio: 'A celebrated vocalist known for her nuanced taan work and mentorship in classical repertoire.',
    image: MainImage,
  },
  {
    name: 'Pandit Rohan K. Das',
    role: 'Tabla & Rhythm Mentor',
    bio: 'Brings precision, creativity, and rhythmic storytelling to every lesson and ensemble practice.',
    image: canadianTalentImage,
  },
  {
    name: 'Smt. Meera Nair',
    role: 'Bharatanatyam Specialist',
    bio: 'Helps students connect posture, story, and expression through disciplined, artist-led training.',
    image: mashurasthakaImage,
  },
  {
    name: 'Prof. Vikas Raman',
    role: 'Music Theory & Composition',
    bio: 'Guides aspiring musicians through taal structures, theory, and contemporary musical exploration.',
    image: sandArtistImage,
  },
]

type FacultyMember = (typeof faculty)[number]

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

const todayIso = new Date().toISOString().split('T')[0]

type BookingField = 'name' | 'email' | 'phone' | 'date' | 'time'

const bookingRules = {
  name: required('Please enter the student name'),
  email: composeValidators(required('Please enter an email address'), email()),
  phone: composeValidators(required('Please enter a phone number'), phone()),
  date: composeValidators(required('Please choose a preferred date'), notPast()),
  time: required('Please choose a preferred time'),
}

function BookingModal({
  person,
  values,
  errors,
  isSubmitted,
  onChange,
  onBlur,
  onSubmit,
  onClose,
}: Readonly<{
  person: FacultyMember
  values: Record<BookingField, string>
  errors: FieldErrors<BookingField>
  isSubmitted: boolean
  onChange: (field: BookingField, value: string) => void
  onBlur: (field: BookingField) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClose: () => void
}>) {
  return (
    <dialog open className="booking-modal-shell" aria-labelledby="faculty-booking-title">
      <button type="button" className="booking-overlay" aria-label="Close booking form" onClick={onClose} />
      <div className="booking-modal">
        <button type="button" className="booking-close" onClick={onClose} aria-label="Close booking form">
          x
        </button>
        <p className="eyebrow">Book with faculty</p>
        <h3 id="faculty-booking-title">{person.name}</h3>
        <p className="booking-role">{person.role}</p>
        <p className="booking-rate">
          <strong>$100</strong> <span>/ hour class</span>
        </p>

        <form className="booking-form" onSubmit={onSubmit} noValidate>
          <div className="form-floating">
            <input
              id="booking-name"
              type="text"
              placeholder="Student name"
              className={`form-control${errors.name ? ' is-invalid' : ''}`}
              value={values.name}
              onChange={(event) => onChange('name', event.target.value)}
              onBlur={() => onBlur('name')}
            />
            <label htmlFor="booking-name">Student name</label>
          </div>
          {errors.name ? <p className="field-error">{errors.name}</p> : null}

          <div className="form-floating">
            <input
              id="booking-email"
              type="email"
              placeholder="Email address"
              className={`form-control${errors.email ? ' is-invalid' : ''}`}
              value={values.email}
              onChange={(event) => onChange('email', event.target.value)}
              onBlur={() => onBlur('email')}
            />
            <label htmlFor="booking-email">Email address</label>
          </div>
          {errors.email ? <p className="field-error">{errors.email}</p> : null}

          <div className="form-floating">
            <input
              id="booking-phone"
              type="tel"
              placeholder="Phone number"
              className={`form-control${errors.phone ? ' is-invalid' : ''}`}
              value={values.phone}
              onChange={(event) => onChange('phone', event.target.value)}
              onBlur={() => onBlur('phone')}
            />
            <label htmlFor="booking-phone">Phone number</label>
          </div>
          {errors.phone ? <p className="field-error">{errors.phone}</p> : null}

          <div className="booking-datetime-row">
            <div className="form-floating">
              <input
                id="booking-date"
                type="date"
                placeholder="Preferred date"
                className={`form-control${errors.date ? ' is-invalid' : ''}`}
                min={todayIso}
                value={values.date}
                onChange={(event) => onChange('date', event.target.value)}
                onBlur={() => onBlur('date')}
              />
              <label htmlFor="booking-date">Preferred date</label>
            </div>
            <div className="form-floating">
              <input
                id="booking-time"
                type="time"
                placeholder="Preferred time"
                className={`form-control${errors.time ? ' is-invalid' : ''}`}
                value={values.time}
                onChange={(event) => onChange('time', event.target.value)}
                onBlur={() => onBlur('time')}
              />
              <label htmlFor="booking-time">Preferred time</label>
            </div>
          </div>
          {errors.date || errors.time ? <p className="field-error">{errors.date ?? errors.time}</p> : null}

          {isSubmitted ? (
            <p className="booking-success">Thanks. Our team will contact you shortly to confirm your class.</p>
          ) : null}

          <button type="submit" className="btn btn-gold full-width">
            Request class slot
          </button>
        </form>
      </div>
    </dialog>
  )
}

export default function FacultyPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { values, errors, handleChange, handleBlur, validateAll, reset } = useFormValidation<BookingField>(
    { name: '', email: '', phone: '', date: '', time: '' },
    bookingRules,
  )

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedFaculty(null)
      }
    }

    if (selectedFaculty) {
      window.addEventListener('keydown', onEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [selectedFaculty])

  const handleBookClass = (person: FacultyMember) => {
    setSelectedFaculty(person)
    setIsSubmitted(false)
    reset()
  }

  const closeModal = () => {
    setSelectedFaculty(null)
    setIsSubmitted(false)
  }

  const handleModalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateAll()) {
      setIsSubmitted(true)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Faculty"
        title="Mentors who model mastery and inspiration"
        description="Our faculty bring discipline, artistic depth, and rigorous creative mentorship to every student journey."
      />

      <section className="section-pad">
        <div className="container card-grid four-up">
          {faculty.map((person) => (
            <article className="faculty-card" key={person.name}>
              <img src={person.image} alt={person.name} className="faculty-photo" />
              <h3>{person.name}</h3>
              <p className="faculty-role">{person.role}</p>
              <p>{person.bio}</p>
              <button
                type="button"
                className="btn btn-outline-light faculty-book-btn"
                onClick={() => handleBookClass(person)}
              >
                Book a class
              </button>
            </article>
          ))}
        </div>
      </section>

      {selectedFaculty ? (
        <BookingModal
          person={selectedFaculty}
          values={values}
          errors={errors}
          isSubmitted={isSubmitted}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleModalSubmit}
          onClose={closeModal}
        />
      ) : null}
    </>
  )
}
