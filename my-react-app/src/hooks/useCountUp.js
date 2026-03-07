import { useEffect, useState } from "react";

export default function useCountUp(end, start = false, duration = 1400) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!start) return

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            setValue(end)
            return
        }

        let ref
        const startTime = performance.now()

        function tick(now) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * end))
            if (progress < 1) {
                raf = requestAnimationFrame(tick)
            }
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [start, end, duration])

    return value
}