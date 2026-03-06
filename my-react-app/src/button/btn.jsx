import React from 'react'
import './btn.css'

export default function Btn({ text, href, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    }
  }

  return (
    <div>
      <button className="mybtn_1" onClick={handleClick}>
        {text}
      </button>
    </div>
  )
}
