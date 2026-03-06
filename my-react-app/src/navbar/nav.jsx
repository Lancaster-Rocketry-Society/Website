import React from 'react'
import './nav.css'

export default function Navbar() {
  return (
    <nav className="navbar-shell">
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
