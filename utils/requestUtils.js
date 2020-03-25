import { isoAbortController } from '../utils/functionUtils'

// TODO: Remove
const API_KEY = process.env.newsApiKey

const PAGE_SIZE = 10

function buildURL(endpoint, params) {
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

function withAbort(url, callback) {
    const { signal, abort } = new isoAbortController()
    return {
        fire: () => fetch(url, { signal })
            .then(callback),
        abort,
    }
}

export function getSources() {
    const params = {
        language: 'en',
    }
    return withAbort(
        buildURL('sources', params),
        response => response.json()
            .then(({ sources }) => sources)
    )
}

function getStories(params) {
    return withAbort(
        buildURL('top-headlines', params),
        response => response.json()
            .then(({ articles, totalResults }) => ({
                stories: articles,
                totalResults,
            }))
    )
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
