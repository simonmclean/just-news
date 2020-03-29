import { createContext } from "react";

export const SETTINGS = Object.freeze({
    THEME: "theme",
    PREFERRED_SOURCES: "preferredSources",
    SHOW_IMAGES: "showImages",
});

const { THEME, PREFERRED_SOURCES, SHOW_IMAGES } = SETTINGS;

export const userDefaults = Object.freeze({
    [THEME]: "auto",
    [PREFERRED_SOURCES]: ["bbc-news", "google-news-uk"],
    [SHOW_IMAGES]: false,
});

export function userSettingsReducer(state, key, value) {
    return {
        ...state,
        [key]: value,
    };
}

function getPreferredTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export function setTheme(selection) {
    const theme = selection === "auto" ? getPreferredTheme() : selection;
    document.documentElement.setAttribute("data-theme", theme);
}

export default createContext(userDefaults);
