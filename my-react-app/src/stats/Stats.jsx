import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import useCountUp from "../hooks/useCountUp";
import './stats.css'

const STATS = [
    { label: 'Rockets Launched', value: 12, icon: 'fas fa-rocket' },
    { label: 'Active Members', value: 45, icon: 'fas fa-users' },
    { label: 'Build Sessions', value: 30, icon: 'fas fa-tools' },
    { label: 'Competition Entries', value: 4, icon: 'fas fa-trophy' },
]

function StatCard({ label, value, icon, isVisible, delay }) {
    const count = useCountUp(value, isVisible, 1400)

    return (
        <div
            className={`stat-card ${isVisible ? 'stat-revealed' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="stat-icon">
                <i className={icon}></i>
            </div>
            <span className="stat-number">{count}+</span>
            <span className="stat-label">{label}</span>
        </div>
    )
}

export default function Stats() {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })

    return (
        <div className="stats-section" ref={ref}>
            <div className="stats-grid">
                {STATS.map((stat, i) => (
                    <StatCard
                        key={stat.label}
                        {...stat}
                        isVisible={isVisible}
                        delay={i * 120}
                    />
                ))}
            </div>
        </div>
    )
}