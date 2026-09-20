import mainImage from '../assets/images/main.jpg'
import facultyImage from '../assets/images/faculty.jpg'
import kannadaKootaImage from '../assets/images/ottawa-kannada-koota.jpg'

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

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A cultural home for artistic excellence"
        description="We cultivate a living tradition of Indian music and dance through immersive learning, dedicated faculty, and community experiences."
      />

      <section className="section-pad">
        <div className="container about-grid">
          <div className="about-story-copy">
            <p className="eyebrow">Our story</p>
            <h2>Rooted in tradition, shaped for the next generation</h2>
            <p className="muted-copy">
              Founded with the purpose of preserving and elevating India's performing arts, Sangeet
              Bharathi brings together disciplined practice, artistic freedom, and a deep respect for
              heritage. Our learners grow in confidence while discovering the emotional and spiritual depth of
              Indian music and dance.
            </p>
            <p className="muted-copy">
              From foundational learning to performance excellence, our programmes are crafted for children,
              beginners, and advanced students alike, ensuring a meaningful education grounded in both craft and
              character.
            </p>
          </div>

          <div className="about-visual-stack">
            <img src={mainImage} alt="Sangeet Bharathi main institute event" className="about-main-image" />
            <div className="about-mini-grid">
              <img src={facultyImage} alt="Faculty interaction" />
              <img src={kannadaKootaImage} alt="Cultural community gathering" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-soft">
        <div className="container">
          <div className="section-heading text-center">
            <p className="eyebrow">What defines us</p>
            <h2>Our approach to learning</h2>
          </div>
          <div className="card-grid three-up">
            {values.map((value) => (
              <div className="info-card" key={value.title}>
                <div className="icon-badge">✦</div>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
