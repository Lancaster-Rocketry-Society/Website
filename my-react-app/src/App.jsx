import React from 'react'
import { HashRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import './App.css'
import './site.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import imgHamed from './assets/Hamed_President.jpg'
import imgAbhi from './assets/Abhi_Vice_President.jpg'
import imgMustafa from './assets/Mustafa_Team_Principle.jpg'
import imgIdris from './assets/Idris_Head_of_Mechanical.jpg'
import imgElectronics from './assets/Head_of_Electronics.jpg'
import imgJoed from './assets/Joed_Head_Of_Chemical.jpg'
import imgMorgan from './assets/Morgan_Head_of_Software.png'
import logo from './assets/logo.png'

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

const TEAM = [
  {
    name: 'Hamed Adam',
    role: 'President',
    image: imgHamed,
    description: 'Leading LURS strategy, launch ops, and external partnerships.',
    linkedin: 'https://www.linkedin.com/in/hamed-adam-66b774331/',
  },
  {
    name: 'Abhi Bhadra',
    role: 'Vice President',
    image: imgAbhi,
    description: 'Overseeing build sessions, safety protocols, and team coordination.',
    linkedin: 'https://www.linkedin.com/in/abhishek-bhadra/',
  },
  {
    name: 'Mustafa Nidigal',
    role: 'Team Principal',
    image: imgMustafa,
    description: 'Managing society budget, kit orders, and launch costs.',
  },
  {
    name: "Morgan O'Carroll",
    role: 'Head of Software',
    image: imgMorgan,
    description: 'Comms, minutes, and coordinating with the union and faculty.',
    linkedin: 'https://www.linkedin.com/in/morganocarroll',
  },
  {
    name: 'Idris Udin',
    role: 'Head of Mechanical Engineering',
    image: imgIdris,
    description: 'Motor selection, test stands, and propulsion workshops.',
    linkedin: 'https://www.linkedin.com/in/idris-uddin137505belta/',
  },
  {
    name: 'Ong Ouipichit',
    role: 'Head of Electronics',
    image: imgElectronics,
    description: 'Launch safety, risk assessments, and range compliance.',
  },
  {
    name: 'Joed',
    role: 'Head of Propulsion',
    image: imgJoed,
    description: 'Organising build nights and airframe/avionics kits.',
  },
]

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Updates', to: '/updates' },
]

const NAV_HASH_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Team', id: 'team' },
  { label: 'Contact', id: 'contact' },
]

const SOCIALS = [
  { icon: 'fab fa-github', href: 'https://github.com/Lancaster-Rocketry-Society', label: 'GitHub' },
  { icon: 'fab fa-discord', href: 'https://discord.gg/ae2xtcbj6w', label: 'Discord' },
  { icon: 'fab fa-whatsapp', href: 'https://chat.whatsapp.com/IheDAUjUjdVA2nfQ8Fi3KT', label: 'WhatsApp' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/lancsrocketry_soc/', label: 'Instagram' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/lancasterrocketry/', label: 'LinkedIn' },
]

/*
  ────────────────────────────────────────
  UPDATES DATA
  ────────────────────────────────────────
  Add new posts at the top of this array.
  Each post accepts:
    title    – Post headline (required)
    date     – Display date string (required)
    excerpt  – Short summary shown on card
    tag      – Category label (e.g. "Social", "Launch", "Workshop")
    image    – Imported image or URL (optional)
*/
const UPDATES = [
  {
    title: 'Welcome to LURS!',
    date: 'March 2025',
    excerpt: 'Lancaster University Rocketry Society is officially up and running. Stay tuned for build sessions, workshops, and our first launch.',
    tag: 'Announcement',
  },
  {
    title: 'First Build Session',
    date: 'Coming Soon',
    excerpt: 'Our first hands-on build session is being planned. Follow our socials for dates and details.',
    tag: 'Workshop',
  },
]

/* ══════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════ */

function Nav() {
  const handleSectionClick = (e, id) => {
    e.preventDefault()
    // If we're not on the home page, navigate there first
    if (window.location.hash !== '#/' && window.location.hash !== '#') {
      window.location.hash = '#/'
      // Wait for page to render then scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="LURS" className="nav-logo-img" />
          <span className="nav-wordmark">LURS</span>
        </Link>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end>{l.label}</NavLink>
            </li>
          ))}
          {NAV_HASH_LINKS.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => handleSectionClick(e, l.id)}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function RetroRule() {
  return <hr className="retro-rule" />
}

function HeroBand() {
  return (
    <div className="hero-band">
      <span /><span /><span />
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="section hero">
      <div className="hero-inner">
        <p className="hero-tagline">Lancaster University Rocketry Society</p>
        <h1 className="hero-title">
          Building rockets.<br />
          Reaching <em>higher</em>.
        </h1>
        <p className="hero-subtitle">
          A student-led society designing, building, and launching rockets
          from the ground up — no experience required.
        </p>
        <div className="star-cluster" />
        <div className="hero-actions">
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn btn-primary">Join the Mission</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn btn-outline">Learn More</a>
        </div>
      </div>
      <HeroBand />
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="section-inner">
        <div className="section-label">About</div>
        <h2 className="section-title">The Mission</h2>
        <RetroRule />
        <div className="about-grid" style={{ marginTop: 40 }}>
          <div className="about-text">
            <p>
              Lancaster University Rocketry Society (LURS) was founded to give
              students hands-on experience in aerospace engineering. We design,
              build, and launch our own rockets — from low-power model rockets
              to high-power projects with custom avionics.
            </p>
            <p>
              Whether you're studying engineering, computer science, physics, or
              anything else entirely — if you're curious about rocketry, there's
              a place for you here. No prior experience needed.
            </p>
          </div>
        </div>
        <div className="about-su">
          <p>
            We are working towards affiliation with{' '}
            <a href="https://lancastersu.co.uk" target="_blank" rel="noopener noreferrer">
              Lancaster University Students' Union
            </a>
            . We are not yet an officially affiliated society.
          </p>
        </div>
      </div>
    </section>
  )
}

function TeamMember({ member }) {
  const initials = member.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="member">
      <div className="member-photo-wrap">
        {member.image ? (
          <img src={member.image} alt={member.name} className="member-photo" />
        ) : (
          <div className="member-initials">{initials}</div>
        )}
      </div>
      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <span className="member-role">{member.role}</span>
        {member.description && (
          <p className="member-desc">{member.description}</p>
        )}
        {member.linkedin && member.linkedin !== '#' && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="member-link"
          >
            LinkedIn &rarr;
          </a>
        )}
      </div>
    </div>
  )
}

function TeamSection() {
  return (
    <section id="team" className="section team">
      <div className="section-inner">
        <div className="section-label">Crew</div>
        <h2 className="section-title">Meet the Team</h2>
        <p className="section-subtitle">
          The people behind LURS — building, launching, and reaching for the sky.
        </p>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <TeamMember key={m.name + i} member={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-inner contact-inner">
        <div className="section-label">Contact</div>
        <h2 className="section-title">Join the Mission</h2>
        <div className="star-cluster" style={{ marginBottom: 24 }} />
        <p className="contact-text">
          Ready to build something that flies? Jump into our community — no
          experience required, just curiosity.
        </p>
        <div className="contact-buttons">
          <a
            href="https://discord.gg/ae2xtcbj6w"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary contact-btn"
          >
            <i className="fab fa-discord"></i> Join our Discord
          </a>
          <a
            href="https://chat.whatsapp.com/IheDAUjUjdVA2nfQ8Fi3KT"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-blue contact-btn"
          >
            <i className="fab fa-whatsapp"></i> WhatsApp Group
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-mark">
          LURS &mdash; Lancaster University Rocketry Society
        </span>
        <ul className="footer-socials">
          {SOCIALS.map(s => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <i className={s.icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

/* ── Pages ── */

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TeamSection />
      <Contact />
    </>
  )
}

function UpdateCard({ post }) {
  return (
    <div className="update-card">
      {post.image ? (
        <img src={post.image} alt={post.title} className="update-card-image" />
      ) : (
        <div className="update-card-image-placeholder">★</div>
      )}
      <div className="update-card-body">
        <p className="update-card-date">{post.date}</p>
        <h3 className="update-card-title">{post.title}</h3>
        <p className="update-card-excerpt">{post.excerpt}</p>
        {post.tag && <span className="update-card-tag">{post.tag}</span>}
      </div>
    </div>
  )
}

function UpdatesPage() {
  return (
    <section className="section" style={{ paddingTop: 140 }}>
      <div className="section-inner">
        <div className="section-label">Mission Log</div>
        <h2 className="section-title">Updates</h2>
        <p className="section-subtitle">
          News, socials, launches, and everything happening at LURS.
        </p>
        <RetroRule />
        {UPDATES.length > 0 ? (
          <div className="updates-grid" style={{ marginTop: 40 }}>
            {UPDATES.map((post, i) => (
              <UpdateCard key={i} post={post} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--silver)', marginTop: 40, fontFamily: 'var(--font-mono)', fontSize: 14 }}>
            No updates yet — check back soon.
          </p>
        )}
      </div>
    </section>
  )
}

/* ── App ── */

export default function App() {
  return (
    <HashRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/updates" element={<UpdatesPage />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}