import { pipe, pair, path, apply } from "ramda";
import { formatRelative, parseISO } from "date-fns";
import { upperFirst, isoURL } from "./functionUtils";

// TODO: Remove
const API_KEY = process.env.newsApiKey;

export const PAGE_SIZE = 5;

const ENDPOINTS = {
    SOURCES: "sources",
    HEADLINES: "top-headlines",
};

const secureURL = (url) => url.replace("http://", "https://");

/**
 * Takes an endpoint name, and an params obj
 * and constructs a complete URL for an API call
 *
 * @param endpoint {@see ENDPOINTS}
 * @param params {Object} - query params in key value pairs
 * @returns {string} - URL
 */
function buildURL(endpoint, params) {
    const url = isoURL("https://newsapi.org");
    url.pathname = `/v2/${endpoint}`;
    url.search = objectToUrlParams({
        apiKey: API_KEY,
        ...params,
    });
    return url.toString();
}

function objectToUrlParams(obj) {
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([param, value]) => {
        params.set(param, value);
    });
    return params.toString();
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
        url: secureURL(story.url),
        urlToImage: story.urlToImage ? secureURL(story.urlToImage) : null,
        relativeTime: getRelativeTime(story),
    };
}

export function getSources() {
    const params = {
        language: "en",
    };
    return fetch(buildURL(ENDPOINTS.SOURCES, params))
        .then((response) => response.json())
        .then(({ sources }) => sources);
}

function getStories(params) {
    return fetch(buildURL(ENDPOINTS.HEADLINES, params))
        .then((response) => response.json())
        .then(({ articles, totalResults }) => ({
            stories: articles.map(normalizeStory),
            totalResults,
            params,
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
