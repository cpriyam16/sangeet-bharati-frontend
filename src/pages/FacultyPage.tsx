import { useEffect, useState } from 'react'
import atSachysImage from '../assets/images/at-sachys.jpg'
import canadianTalentImage from '../assets/images/canadian-talent-org.jpg'
import mashurasthakaImage from '../assets/images/mashurasthaka.jpg'
import sandArtistImage from '../assets/images/sand-artist.png'

const faculty = [
  {
    name: 'Guru Ananya Sen',
    role: 'Hindustani Vocal Faculty',
    bio: 'A celebrated vocalist known for her nuanced taan work and mentorship in classical repertoire.',
    image: atSachysImage,
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

export default function FacultyPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<(typeof faculty)[number] | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleBookClass = (person: (typeof faculty)[number]) => {
    setSelectedFaculty(person)
    setIsSubmitted(false)
  }

  const closeModal = () => {
    setSelectedFaculty(null)
    setIsSubmitted(false)
  }

  const handleModalSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsSubmitted(true)
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
        <dialog open className="booking-modal-shell" aria-labelledby="faculty-booking-title">
          <div className="booking-modal">
            <button type="button" className="booking-close" onClick={closeModal} aria-label="Close booking form">
              x
            </button>
            <p className="eyebrow">Book with faculty</p>
            <h3 id="faculty-booking-title">{selectedFaculty.name}</h3>
            <p className="booking-role">{selectedFaculty.role}</p>

            <form className="booking-form" onSubmit={handleModalSubmit}>
              <div className="form-floating">
                <input id="booking-name" type="text" placeholder="Student name" className="form-control" required />
                <label htmlFor="booking-name">Student name</label>
              </div>
              <div className="form-floating">
                <input id="booking-email" type="email" placeholder="Email address" className="form-control" required />
                <label htmlFor="booking-email">Email address</label>
              </div>
              <div className="form-floating">
                <input id="booking-phone" type="tel" placeholder="Phone number" className="form-control" required />
                <label htmlFor="booking-phone">Phone number</label>
              </div>
              <div className="form-floating">
                <textarea
                  id="booking-preferred-time"
                  placeholder={`Preferred schedule with ${selectedFaculty.name}`}
                  className="form-control"
                  rows={3}
                  required
                />
                <label htmlFor="booking-preferred-time">Preferred days and timings</label>
              </div>

              {isSubmitted ? (
                <p className="booking-success">Thanks. Our team will contact you shortly to confirm your class.</p>
              ) : null}

              <button type="submit" className="btn btn-gold full-width">
                Request class slot
              </button>
            </form>
          </div>
        </dialog>
      ) : null}
    </>
  )
}
