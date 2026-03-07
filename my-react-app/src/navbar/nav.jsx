import React, { useEffect, useState } from 'react'
import './nav.css'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar-shell ${scrolled ? 'nav-scrolled' : ''}`}>
      <a href="#home" className="nav-logo">
        <img src={logo} alt="LURS" className="nav-logo-img" />
      </a>
      <ul className="nav-links">
        <li className="center">
          <a href="#home">Home</a>
        </li>
        <li className="center">
          <a href="#team">Team</a>
        </li>
        <li className="upward">
          <a href="#calendar">Calendar</a>
        </li>
      </ul>
    </nav>
  )
}
