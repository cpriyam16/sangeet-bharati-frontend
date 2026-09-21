const events = [
  {
    date: '12 Oct',
    title: 'Navarasa Festival',
    copy: 'A multi-day celebration of music, dance, and storytelling for families and cultural circles.',
    tag: 'Annual Festival',
  },
  {
    date: '27 Oct',
    title: 'Raga Workshop Series',
    copy: 'An interactive learning experience for beginners and intermediate learners across vocal styles.',
    tag: 'Workshop',
  },
  {
    date: '09 Nov',
    title: 'Young Artists Showcase',
    copy: 'Students present recitals and choreography in a beautifully curated evening of live performance.',
    tag: 'Performance',
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

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Celebrations, workshops, and moments of artistic joy"
        description="Participation is central to our learning culture. Explore upcoming performances, immersive workshops, and community events."
      />

      <section className="section-pad">
        <div className="container">
          <div className="event-list">
            {events.map((event) => (
              <article className="event-card" key={event.title}>
                <div className="event-date">
                  <strong>{event.date}</strong>
                </div>
                <div className="event-content">
                  <span className="tag">{event.tag}</span>
                  <h3>{event.title}</h3>
                  <p>{event.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
