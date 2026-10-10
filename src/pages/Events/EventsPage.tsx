import { useState } from 'react'

const events = [
  // ── Upcoming ──────────────────────────────────────────────
  {
    date: '12 Oct',
    fullDate: '2026-10-12',
    title: 'Navarasa Festival',
    copy: 'A multi-day celebration of music, dance, and storytelling for families and cultural circles.',
    tag: 'Annual Festival',
  },
  {
    date: '27 Oct',
    fullDate: '2026-10-27',
    title: 'Raga Workshop Series',
    copy: 'An interactive learning experience for beginners and intermediate learners across vocal styles.',
    tag: 'Workshop',
  },
  {
    date: '09 Nov',
    fullDate: '2026-11-09',
    title: 'Young Artists Showcase',
    copy: 'Students present recitals and choreography in a beautifully curated evening of live performance.',
    tag: 'Performance',
  },
  {
    date: '22 Nov',
    fullDate: '2026-11-22',
    title: 'Carnatic Strings Ensemble',
    copy: 'An evening of veena, violin, and mridangam — a classical concert for all music lovers.',
    tag: 'Concert',
  },
  // ── Past ──────────────────────────────────────────────────
  {
    date: '14 Sep',
    fullDate: '2026-09-14',
    title: 'Monsoon Melody Night',
    copy: 'A soulful evening of semi-classical vocals celebrating the monsoon season through song.',
    tag: 'Concert',
  },
  {
    date: '02 Sep',
    fullDate: '2026-09-02',
    title: 'Bharatanatyam Arangetram',
    copy: 'The grand debut of our senior student in a solo Bharatanatyam performance — a milestone celebration.',
    tag: 'Performance',
  },
  {
    date: '10 Aug',
    fullDate: '2026-08-10',
    title: 'Summer Intensives 2026',
    copy: 'Week-long deep-dive workshops in Hindustani vocals, Carnatic rhythm, and classical dance forms.',
    tag: 'Workshop',
  },
  {
    date: '28 Jul',
    fullDate: '2026-07-28',
    title: 'Guru Purnima Celebration',
    copy: 'Annual tribute to our teachers — an evening of gratitude, music, and community gathering.',
    tag: 'Annual Festival',
  },
]

const TODAY = new Date().toISOString().slice(0, 10)

const upcomingEvents = events.filter((e) => e.fullDate >= TODAY)
const pastEvents = events.filter((e) => e.fullDate < TODAY)

type Tab = 'upcoming' | 'past'

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

interface EventCardProps {
  date: string
  title: string
  copy: string
  tag: string
  isPast?: boolean
}

function EventCard({ date, title, copy, tag, isPast }: Readonly<EventCardProps>) {
  return (
    <article className={`event-card${isPast ? ' event-card--past' : ''}`}>
      <div className="event-date">
        <strong>{date}</strong>
      </div>
      <div className="event-content">
        <span className="tag">{tag}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </article>
  )
}

function EmptyState({ message }: Readonly<{ message: string }>) {
  return (
    <div className="empty-state">
      <p>{message}</p>
    </div>
  )
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming')

  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Celebrations, workshops, and moments of artistic joy"
        description="Participation is central to our learning culture. Explore upcoming performances, immersive workshops, and community events."
      />

      <section className="section-pad">
        <div className="container">
          {/* Tab Bar */}
          <div className="events-tabs" role="tablist" aria-label="Event categories">
            <button
              id="tab-upcoming"
              role="tab"
              aria-selected={activeTab === 'upcoming'}
              aria-controls="tabpanel-upcoming"
              className={`events-tab-btn${activeTab === 'upcoming' ? ' events-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events
              <span className="events-tab-count">{upcomingEvents.length}</span>
            </button>
            <button
              id="tab-past"
              role="tab"
              aria-selected={activeTab === 'past'}
              aria-controls="tabpanel-past"
              className={`events-tab-btn${activeTab === 'past' ? ' events-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past Events
              <span className="events-tab-count">{pastEvents.length}</span>
            </button>
          </div>

          {/* Tab Panel */}
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="events-tab-panel"
          >
            {displayedEvents.length > 0 ? (
              <div className="event-list">
                {displayedEvents.map((event) => (
                  <EventCard key={event.title} isPast={activeTab === 'past'} {...event} />
                ))}
              </div>
            ) : (
              <EmptyState
                message={
                  activeTab === 'upcoming'
                    ? 'No upcoming events at this time. Check back soon!'
                    : 'No past events to display yet.'
                }
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
