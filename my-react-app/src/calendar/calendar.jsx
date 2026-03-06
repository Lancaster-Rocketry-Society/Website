import React, { useState, useRef, useEffect } from 'react'
import './calendar.css'
import Nav from '../navbar/nav.jsx'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const COLOR_OPTIONS = [
  { name: 'Amber', value: '#e67e22' },
  { name: 'Cyan', value: '#1fd7e8' },
  { name: 'Green', value: '#4caf50' },
  { name: 'Purple', value: '#9c27b0' },
  { name: 'Orange', value: '#ff9800' },
  { name: 'Pink', value: '#e91e63' },
  { name: 'Blue', value: '#2196f3' },
  { name: 'Red', value: '#f44336' },
  { name: 'Yellow', value: '#ffeb3b' },
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function isToday(year, month, day) {
  const today = new Date()
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
}

export default function Calendar({ hideNav }) {
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendar-events')
    return saved ? JSON.parse(saved) : {}
  })
  const [selectedDay, setSelectedDay] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [eventTime, setEventTime] = useState('12:00')
  const [eventColor, setEventColor] = useState(COLOR_OPTIONS[0].value)
  const [editingIndex, setEditingIndex] = useState(null)
  const [viewMode, setViewMode] = useState('month') // 'month' or 'week'
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('calendar-accent') || '#e67e22'
  })
  const [showSettings, setShowSettings] = useState(false)
  const [weekStartsMonday, setWeekStartsMonday] = useState(() => {
    return localStorage.getItem('calendar-weekstart') === 'true'
  })

  const modalRef = useRef(null)

  // Persist events
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events))
  }, [events])

  // Persist settings
  useEffect(() => {
    localStorage.setItem('calendar-accent', accentColor)
  }, [accentColor])

  useEffect(() => {
    localStorage.setItem('calendar-weekstart', weekStartsMonday)
  }, [weekStartsMonday])

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal()
      }
    }
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showModal])

  // Navigation
  function goToPrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
  }

  function goToToday() {
    const t = new Date()
    setCurrentYear(t.getFullYear())
    setCurrentMonth(t.getMonth())
  }

  // Events
  function openAddEvent(day) {
    setSelectedDay(day)
    setEventTitle('')
    setEventTime('12:00')
    setEventColor(accentColor)
    setEditingIndex(null)
    setShowModal(true)
  }

  function openEditEvent(day, index) {
    const key = formatDateKey(currentYear, currentMonth, day)
    const ev = events[key][index]
    setSelectedDay(day)
    setEventTitle(ev.title)
    setEventTime(ev.time || '12:00')
    setEventColor(ev.color || accentColor)
    setEditingIndex(index)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditingIndex(null)
  }

  function saveEvent(e) {
    e.preventDefault()
    if (!eventTitle.trim()) return
    const key = formatDateKey(currentYear, currentMonth, selectedDay)
    const newEvent = { title: eventTitle.trim(), time: eventTime, color: eventColor }
    setEvents(prev => {
      const updated = { ...prev }
      if (!updated[key]) updated[key] = []
      if (editingIndex !== null) {
        updated[key] = [...updated[key]]
        updated[key][editingIndex] = newEvent
      } else {
        updated[key] = [...updated[key], newEvent]
      }
      // Sort by time
      updated[key].sort((a, b) => (a.time || '').localeCompare(b.time || ''))
      return updated
    })
    closeModal()
  }

  function deleteEvent(day, index) {
    const key = formatDateKey(currentYear, currentMonth, day)
    setEvents(prev => {
      const updated = { ...prev }
      updated[key] = updated[key].filter((_, i) => i !== index)
      if (updated[key].length === 0) delete updated[key]
      return updated
    })
  }

  // Build calendar grid
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  let firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const dayNames = weekStartsMonday
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : DAY_NAMES

  if (weekStartsMonday) {
    firstDay = firstDay === 0 ? 6 : firstDay - 1
  }

  // Previous month trailing days
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)

  const calendarCells = []

  // Trailing days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarCells.push({ day: daysInPrevMonth - i, type: 'prev' })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({ day: d, type: 'current' })
  }

  // Next month leading days
  const remaining = 42 - calendarCells.length
  for (let i = 1; i <= remaining; i++) {
    calendarCells.push({ day: i, type: 'next' })
  }

  // If only 5 rows needed, trim to 35
  const totalRows = calendarCells.length > 35 && calendarCells.slice(35).every(c => c.type === 'next')
    ? 35
    : 42
  const cells = calendarCells.slice(0, totalRows)

  // Week view
  function getWeekDates() {
    const t = new Date()
    const dayOfWeek = t.getDay()
    const startOffset = weekStartsMonday ? (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) : -dayOfWeek
    const dates = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(t)
      d.setDate(t.getDate() + startOffset + i)
      dates.push(d)
    }
    return dates
  }

  const weekDates = getWeekDates()

  const cssVars = { '--accent': accentColor, '--accent-glow': accentColor + '40' }

  return (
    <div className="cal-page" style={cssVars}>
      {!hideNav && (
        <div className="navbar">
          <Nav />
        </div>
      )}
      <div className="cal-wrapper">
        {/* Header */}
        <div className="cal-header">
          <div className="cal-header-left">
            <h1 className="cal-title">{MONTH_NAMES[currentMonth]} {currentYear}</h1>
            <button className="cal-today-btn" onClick={goToToday}>Today</button>
          </div>
          <div className="cal-header-right">
            <div className="cal-view-toggle">
              <button
                className={`cal-toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
                onClick={() => setViewMode('month')}
              >Month</button>
              <button
                className={`cal-toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
                onClick={() => setViewMode('week')}
              >Week</button>
            </div>
            <button className="cal-settings-btn" onClick={() => setShowSettings(s => !s)}>
              <i className="fas fa-cog"></i>
            </button>
            <div className="cal-nav-arrows">
              <button className="cal-arrow" onClick={goToPrevMonth}><i className="fas fa-chevron-left"></i></button>
              <button className="cal-arrow" onClick={goToNextMonth}><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="cal-settings">
            <div className="cal-settings-section">
              <label className="cal-settings-label">Accent Color</label>
              <div className="cal-color-row">
                {COLOR_OPTIONS.map(c => (
                  <button
                    key={c.value}
                    className={`cal-color-swatch ${accentColor === c.value ? 'selected' : ''}`}
                    style={{ background: c.value }}
                    onClick={() => setAccentColor(c.value)}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
            <div className="cal-settings-section">
              <label className="cal-settings-label">
                <input
                  type="checkbox"
                  checked={weekStartsMonday}
                  onChange={e => setWeekStartsMonday(e.target.checked)}
                />
                Week starts on Monday
              </label>
            </div>
          </div>
        )}

        {/* Month View */}
        {viewMode === 'month' && (
          <div className="cal-grid-wrapper">
            <div className="cal-day-names">
              {dayNames.map(d => (
                <div key={d} className="cal-day-name">{d}</div>
              ))}
            </div>
            <div className="cal-grid" style={{ gridTemplateRows: `repeat(${totalRows / 7}, 1fr)` }}>
              {cells.map((cell, idx) => {
                const key = cell.type === 'current'
                  ? formatDateKey(currentYear, currentMonth, cell.day)
                  : null
                const dayEvents = key ? (events[key] || []) : []
                const todayClass = cell.type === 'current' && isToday(currentYear, currentMonth, cell.day) ? 'today' : ''
                return (
                  <div
                    key={idx}
                    className={`cal-cell ${cell.type} ${todayClass}`}
                    onClick={() => cell.type === 'current' && openAddEvent(cell.day)}
                  >
                    <span className="cal-cell-number">{cell.day}</span>
                    <div className="cal-cell-events">
                      {dayEvents.slice(0, 3).map((ev, i) => (
                        <div
                          key={i}
                          className="cal-event-chip"
                          style={{ '--chip-color': ev.color || accentColor }}
                          onClick={(e) => { e.stopPropagation(); openEditEvent(cell.day, i) }}
                        >
                          <span className="cal-event-time">{ev.time}</span>
                          <span className="cal-event-title">{ev.title}</span>
                          <button
                            className="cal-event-delete"
                            onClick={(e) => { e.stopPropagation(); deleteEvent(cell.day, i) }}
                          >&times;</button>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="cal-event-more">+{dayEvents.length - 3} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="cal-week-wrapper">
            <div className="cal-week-header">
              {weekDates.map((d, i) => {
                const dayLabel = dayNames[i]
                const isTodayDate = isToday(d.getFullYear(), d.getMonth(), d.getDate())
                return (
                  <div key={i} className={`cal-week-day-header ${isTodayDate ? 'today' : ''}`}>
                    <span className="cal-week-day-name">{dayLabel}</span>
                    <span className="cal-week-day-num">{d.getDate()}</span>
                  </div>
                )
              })}
            </div>
            <div className="cal-week-body">
              {weekDates.map((d, i) => {
                const key = formatDateKey(d.getFullYear(), d.getMonth(), d.getDate())
                const dayEvents = events[key] || []
                const isTodayDate = isToday(d.getFullYear(), d.getMonth(), d.getDate())
                return (
                  <div
                    key={i}
                    className={`cal-week-col ${isTodayDate ? 'today' : ''}`}
                    onClick={() => {
                      setCurrentYear(d.getFullYear())
                      setCurrentMonth(d.getMonth())
                      openAddEvent(d.getDate())
                    }}
                  >
                    {dayEvents.map((ev, j) => (
                      <div
                        key={j}
                        className="cal-week-event"
                        style={{ '--chip-color': ev.color || accentColor }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentYear(d.getFullYear())
                          setCurrentMonth(d.getMonth())
                          openEditEvent(d.getDate(), j)
                        }}
                      >
                        <span className="cal-event-time">{ev.time}</span>
                        <span className="cal-event-title">{ev.title}</span>
                      </div>
                    ))}
                    {dayEvents.length === 0 && (
                      <span className="cal-week-empty">No events</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Event Modal */}
      {showModal && (
        <div className="cal-modal-overlay">
          <div className="cal-modal" ref={modalRef}>
            <h3 className="cal-modal-title">
              {editingIndex !== null ? 'Edit Event' : 'New Event'}
              <span className="cal-modal-date">
                {MONTH_NAMES[currentMonth]} {selectedDay}, {currentYear}
              </span>
            </h3>
            <form onSubmit={saveEvent}>
              <div className="cal-modal-field">
                <label>Title</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  placeholder="Event name"
                  autoFocus
                  maxLength={80}
                />
              </div>
              <div className="cal-modal-field">
                <label>Time</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={e => setEventTime(e.target.value)}
                />
              </div>
              <div className="cal-modal-field">
                <label>Color</label>
                <div className="cal-color-row">
                  {COLOR_OPTIONS.map(c => (
                    <button
                      type="button"
                      key={c.value}
                      className={`cal-color-swatch ${eventColor === c.value ? 'selected' : ''}`}
                      style={{ background: c.value }}
                      onClick={() => setEventColor(c.value)}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
              <div className="cal-modal-actions">
                <button type="button" className="cal-modal-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="cal-modal-save">
                  {editingIndex !== null ? 'Update' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>

          







        </div>
      )}
    </div>
  )
}
