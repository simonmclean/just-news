function isBrowser() {
    return typeof window !== "undefined";
}

export function isoURL(url) {
    return isBrowser() ? new URL(url) : {};
}

export function upperFirst(str) {
    const [firstLetter, ...rest] = str;
    return [firstLetter.toUpperCase(), ...rest].join("");
}
