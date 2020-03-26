import { useEffect } from 'react'

function getScrollPos() {
    return window.scrollY
}

export default function useScrollPos(callback, deps) {
    useEffect(() => {
        function handleScroll() {
            callback(getScrollPos())
        }

        window.addEventListener(
            'scroll',
            handleScroll,
            { passive: true }
        )

        return () => window.removeEventListener('scroll', handleScroll)
    }, [...deps, callback])
}
