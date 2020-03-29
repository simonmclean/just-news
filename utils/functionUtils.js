export function isoAbortController() {
    return typeof window !== "undefined"
        ? new AbortController()
        : {
              abort: () => {},
              signal: {},
          };
}

export function upperFirst(str) {
    const [firstLetter, ...rest] = str;
    return [firstLetter.toUpperCase(), ...rest].join("");
}
