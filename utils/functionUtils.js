/*
 * Isomorphic wrapper for AbortController
 * Uses a mock implementation when run on the server
 */
export function isoAbortController() {
    return typeof window !== 'undefined'
        ? AbortController
        : { abort: () => {} }
}
