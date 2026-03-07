import React, { useEffect, useState} from "react";
import './scrollprogress.css'

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        function onScroll() {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            if (docHeight > 0) {
                setProgress((scrollTop / docHeight) * 100)
            } 
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div className="scroll-progress-track">
            <div 
                className="scroll-progress-bar"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}