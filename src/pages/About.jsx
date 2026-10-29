import { images } from '../assets/images.js';
import { site, team, timeline } from '../data/site.js';
import Reveal from '../components/Reveal.jsx';

export default function About() {
  return (
    <>
      <div className="about-hero">
        <img
          src={images['interior-wide']}
          alt="The sunlit main room at Ember, with marble tables, bentwood chairs, and olive trees"
          fetchpriority="high"
        />
      </div>

      <section className="story-section">
        <Reveal>
          <h1 className="display-md">Our story</h1>
        </Reveal>
        <Reveal className="story-copy" delay={80}>
          <p>
            {site.name} began in {site.founded} with one small counter and one good grinder. We
            roast every week, bake every morning, and kept the room small on purpose.
          </p>
          <p>Come for the coffee. Stay for the light.</p>
        </Reveal>
      </section>

      <section className="timeline-section" aria-labelledby="milestones">
        <h2 className="sr-only" id="milestones">
          Milestones
        </h2>
        {timeline.map((item, index) => (
          <Reveal as="article" className="timeline-item" key={item.year} delay={index * 80}>
            <div className="timeline-media">
              <img src={images[item.image]} alt={item.alt} loading="lazy" />
            </div>
            <h3 className="timeline-year">{item.year}</h3>
            <p className="timeline-label">{item.title}</p>
          </Reveal>
        ))}
      </section>

      <section className="founder-section">
        <div className="founder-media">
          <img
            src={images['founder-portrait']}
            alt={`${site.founder}, founder of Ember, in the cafe`}
            loading="lazy"
          />
        </div>
        <Reveal className="founder-copy">
          <p className="eyebrow muted">Founder &amp; CEO</p>
          <h2 className="display-md">{site.founder}</h2>
          <p className="body-lg founder-quote">
            I wanted one room where nobody rushes. Ember is that room.
          </p>
          <p className="small muted">Since {site.founded}</p>
        </Reveal>
      </section>

      <section className="team-section">
        <h2 className="section-title">Team</h2>
        <div className="team-list">
          {team.map((person, index) => (
            <Reveal
              className={`team-row ${index % 2 === 1 ? 'team-row--flip' : ''}`}
              key={person.name}
            >
              <div className="team-media">
                <img src={images[person.image]} alt={person.alt} loading="lazy" />
              </div>
              <div className="team-copy">
                <h3 className="team-name">{person.name}</h3>
                <p className="team-role">{person.role}</p>
                <dl className="team-meta">
                  <div>
                    <dt>Hours</dt>
                    <dd>{person.hours}</dd>
                  </div>
                  <div>
                    <dt>Since</dt>
                    <dd>{person.since}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
