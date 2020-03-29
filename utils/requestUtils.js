import { pipe, pair, path, apply } from "ramda";
import { formatRelative, parseISO } from "date-fns";
import { upperFirst } from "./functionUtils";

// TODO: Remove
const API_KEY = process.env.newsApiKey;

const PAGE_SIZE = 10;

const ENDPOINTS = {
    SOURCES: "sources",
    HEADLINES: "top-headlines",
};

/**
 * Takes an endpoint name, and an params obj
 * and constructs a complete URL for an API call
 *
 * @param endpoint {@see ENDPOINTS}
 * @param params {Object} - query params in key value pairs
 * @returns {string} - URL
 */
function buildURL(endpoint, params) {
    return (
        "https://newsapi.org/v2/" +
        endpoint +
        "?apiKey=" +
        API_KEY +
        objectToUrlParams(params)
    );
}

function objectToUrlParams(obj) {
    return Object.entries(obj).reduce(
        (acc, [param, value]) => `${acc}&${param}=${value}`,
        ""
    );
}

/**
 * Takes a story, grabs the "publishedAt" property and converts that
 * to a human readable relative time format. e.g. "Today at 5:00pm"
 *
 * @param story {Object}
 * @returns {String}
 */
const getRelativeTime = pipe(
    path(["publishedAt"]),
    parseISO,
    pair(Date.now()),
    apply(formatRelative),
    upperFirst
);

function normalizeStory(story) {
    return {
        ...story,
        relativeTime: getRelativeTime(story),
    };
}

// TODO: Convert to async
export function getSources() {
    const params = {
        language: "en",
    };
    return fetch(buildURL(ENDPOINTS.SOURCES, params))
        .then((response) => response.json())
        .then(({ sources }) => sources);
}

// TODO: Convert to async
function getStories(params) {
    return fetch(buildURL(ENDPOINTS.HEADLINES, params))
        .then((response) => response.json())
        .then(({ articles, totalResults }) => ({
            stories: articles.map(normalizeStory),
            totalResults,
        }));
}

export function getStoriesBySource(sources, page = 0) {
    return getStories({
        sources: sources.join(),
        page,
        pageSize: PAGE_SIZE,
    });
}

export function getStoriesByCategory(category, page = 0) {
    return getStories({
        category,
        page,
        pageSize: PAGE_SIZE,
        country: "gb",
    });
}
