export function isoAbortController() {
    return typeof window !== 'undefined'
        ? AbortController
        : { abort: () => {} }
}
