import React from 'react'
import './team.css'
import './member.css'
import Member from './member.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

import imgHamed from '../assets/Hamed_President.jpg'
import imgAbhi from '../assets/Abhi_Vice_President.jpg'
import imgMustafa from '../assets/Mustafa_Team_Principle.jpg'
import imgIdris from '../assets/Idris_Head_of_Mechanical.jpg'
import imgElectronics from '../assets/Head_of_Electronics.jpg'
import imgJoed from '../assets/Joed_Head_Of_Chemical.jpg'
import imgMorgan from '../assets/Morgan_Head_of_Software.png'

/*
  ───────────────────────────────────────────
  Edit the TEAM_DATA array below to customise
  your team members, roles, and descriptions.
  ───────────────────────────────────────────
  Each member accepts:
    name        – Full name (required)
    role        – Position / title (required)
    group       – "exec" | "committee" | "advisor"  (used for filtering)
    image       – URL or import path (optional – initials shown if omitted)
    linkedin    – LinkedIn profile URL (optional)
    description – Short bio (optional)
*/

const TEAM_DATA = [
  // ── Executive Board ──
  {
    name: 'Hamed Adam',
    role: 'President',
    group: 'exec',
    image: imgHamed,
    description: 'Leading LURS strategy, launch ops, and external partnerships.',
    linkedin: 'https://www.linkedin.com/in/hamed-adam-66b774331/',
  },
  {
    name: 'Abhi Bhadra',
    role: 'Vice President',
    group: 'exec',
    image: imgAbhi,
    description: 'Overseeing build sessions, safety protocols, and team coordination.',
    linkedin: 'https://www.linkedin.com/in/abhishek-bhadra/',
  },
  {
    name: 'Mustafa Nidigal',
    role: 'Team Principal',
    group: 'exec',
    image: imgMustafa,
    description: 'Managing society budget, kit orders, and launch costs.',
    linkedin: '#',
  },
  {
    name: "Morgan O'Carroll",
    role: 'Head of SoftWare',
    group: 'exec',
    image: imgMorgan,
    description: 'Comms, minutes, and coordinating with the union and faculty.',
    linkedin: 'https://www.linkedin.com/in/morganocarroll',
  },
  {
    name: 'Idris Udin',
    role: 'Head of Mechanical Engineering',
    group: 'exec',
    image: imgIdris,
    description: 'Motor selection, test stands, and propulsion workshops.',
    linkedin: 'https://www.linkedin.com/in/idris-uddin137505belta/',
  },
  {
    name: 'Ong Ouipichit',
    role: 'Head of Electronics',
    group: 'exec',
    image: imgElectronics,
    description: 'Launch safety, risk assessments, and range compliance.',
    linkedin: '#',
  },
  {
    name: 'Joed',
    role: 'Head of Propulsion',
    group: 'committee',
    image: imgJoed,
    description: 'Organising build nights and airframe/avionics kits.',
    linkedin: '#',
  },
  {
    name: 'Morgan Davis',
    role: 'Tech Lead',
    group: 'committee',
    description: 'Society website, flight data tools, and sims.',
    linkedin: '#',
  },
  {
    name: 'Quinn Harper',
    role: 'Outreach Lead',
    group: 'committee',
    description: 'Schools outreach, taster sessions, and cross-society links.',
    linkedin: '#',
  },
]

function AnimatedMember({ member, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`team-card-wrapper ${isVisible ? 'team-card-revealed' : ''}`}
      style={{ transitionDelay: `${(index & 3) * 100}ms`}}
    >
      <Member
        name={member.name}
        role={member.role}
        image={member.image}
        linkedin={member.linkedin}
        description={member.description}
      />
    </div>
  )
}

export default function Team() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.3})
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.3 })

  return (
    <div className="team-page">
      <div className="team-wrapper">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`team-header ${headerVisible ? 'team-header-revealed' : ''}`}
        >
          <h1 className="team-title">Meet the Team</h1>
          <p className="team-subtitle">
            The people behind Lancaster University Rocketry Society — building, launching, and reaching for the sky.
          </p>
        </div>

        {/* Members Grid */}
        <div className="team-grid">
          {TEAM_DATA.map((member, idx) => (
            <AnimatedMember key={member.name + idx} member={member} index={idx} />
          ))}
        </div>

        {/* Join CTA */}
        <div
          ref={ctaRef}
          className={`team-cta ${ctaVisible ? 'team-cta-revealed' : ''}`}
        >
          <h2 className="team-cta-title">Want to join the team?</h2>
          <p className="team-cta-text">
            Committee applications open at the start of each academic year. Follow us on social media to stay updated.
          </p>
        </div>
      </div>
    </div>
  )
}
