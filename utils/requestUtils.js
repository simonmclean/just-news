import { memoizeWith } from 'ramda'

const API_KEY = process.env.newsApiKey

const PAGE_SIZE = 10

function getURL(endpoint, params) {
    return 'https://newsapi.org/v2/'
        + endpoint
        + '?apiKey='
        + API_KEY
        + objectToUrlParams(params)
}

function objectToUrlParams(obj) {
    return Object.entries(obj).reduce((acc, [param, value]) => (
        `${acc}&${param}=${value}`
    ), '')
}

export function getSources() {
    const params = {
        language: 'en',
    }
    // TODO: Convert to async func
    return fetch(getURL('sources', params))
        .then(response => response.json())
        .then(({ sources }) => sources)
}

function getStories(params) {
    // TODO: Convert to async func
    return fetch(getURL('top-headlines', params))
        .then(response => response.json())
        .then(({ articles, totalResults }) => ({
            stories: articles,
            totalResults,
        }))
}

export function getStoriesBySource(sources, page = 0) {
    return getStories({
        sources: sources.join(),
        page,
        pageSize: PAGE_SIZE,
    })
}

export function getStoriesByCategory(category, page = 0) {
    return getStories({
        category,
        page,
        pageSize: PAGE_SIZE,
        country: 'gb',
    })
}
