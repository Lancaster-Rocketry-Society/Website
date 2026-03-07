import { useEffect, useRef, useState } from "react";

export default function useScrollReveal({
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
} = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            setIsVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (once) observer.unobserve(el)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(el)
        return () => observer.unobserve(el)
    }, [threshold, rootMargin, once])

    return { ref, isVisible }
}