export function isoAbortController() {
    return typeof window !== "undefined"
        ? new AbortController()
        : {
              abort: () => {},
              signal: {},
          };
}
