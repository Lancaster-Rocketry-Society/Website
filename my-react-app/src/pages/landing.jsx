import React from 'react'
import Nav from '../navbar/nav.jsx'
import Home from '../home/home.jsx'
import Team from '../team/team.jsx'
import Calendar from '../calendar/calendar.jsx'
import Stats from '../Stats.jsx'
import ScrollProgress from '../scrollprogress/ScrollProgress.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './landing.css'

export default function Landing() {
  return (
    <div className="landing-page">
      <ScrollProgress />
      <header className="landing-header">
        <Nav />
      </header>

      <section id="home" className="landing-section landing-section-home">
        <Home hideNav />
      </section>


      {/* Stats */}
      <section className="landing-section-stats">
        <Stats />
      </section>

      <section id="team" className="landing-section landing-section-team">
        <Team hideNav />
      </section>

      <section id="calendar" className="landing-section landing-section-calendar">
        <Calendar hideNav />
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <ul className="landing-socials">
            <li>
              <a className="landing-social github" href="https://github.com/Lancaster-Rocketry-Society" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a className="landing-social discord" href="https://discord.gg/ae2xtcbj6w" aria-label="Discord">
                <i className="fab fa-discord"></i>
              </a>
            </li>
            <li>
              <a className="landing-social whatsapp" href="https://chat.whatsapp.com/IheDAUjUjdVA2nfQ8Fi3KT" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </li>
            <li>
              <a className="landing-social instagram" href="https://www.instagram.com/lancsrocketry_soc/" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a className="landing-social linkedin" href="https://www.linkedin.com/company/lancasterrocketry/" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
