import React from 'react'
import './member.css'

export default function Member({ name, role, image, linkedin, description }) {
  // Generate initials for avatar fallback
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div className="member-card">
      <div className="member-card-inner">
        {/* Front */}
        <div className="member-front">
          <div className="member-avatar-wrap">
            {image ? (
              <img src={image} alt={name} className="member-avatar" />
            ) : (
              <div className="member-avatar-placeholder">
                <span>{initials}</span>
              </div>
            )}
            <div className="member-role-badge">{role}</div>
          </div>
          <h3 className="member-name">{name}</h3>
          {description && <p className="member-desc">{description}</p>}
        </div>

        {/* Overlay on hover */}
        <div className="member-overlay">
          <h3 className="member-overlay-name">{name}</h3>
          <span className="member-overlay-role">{role}</span>
          {description && <p className="member-overlay-desc">{description}</p>}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="member-linkedin"
              onClick={e => e.stopPropagation()}
            >
              <i className="fab fa-linkedin-in"></i>
              <span>Connect</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
