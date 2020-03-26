import { useEffect } from 'react'

function getScrollPos() {
    return window.scrollY
}

export default function useScrollPos(callback, deps) {
    function handleScroll() {
        callback(getScrollPos())
    }

    useEffect(() => {
        window.addEventListener(
            'scroll',
            handleScroll,
            { passive: true }
        )
        return () => window.removeEventListener('scroll', handleScroll)
    }, deps)
}
