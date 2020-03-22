import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import StoriesList from '../components/stories/StoriesList'
import { getStoriesBySource } from '../utils/requestUtils'
import UserSettingsContext from '../contexts/UserSettingsContext'
import RequestLogContext, { isRequestStale } from '../contexts/RequestLogContext'

export default function HomePage() {
    const pathName = useRouter().asPath
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const { preferredSources } = useContext(UserSettingsContext)
    const { requestLog, logRequest } = useContext(RequestLogContext)

    // TODO: Cleanup with { lastRequestTime } = requestLog?.['/']
    const log = requestLog[pathName] || {}
    const {
        lastRequestTime,
        dependancies: prevSources,
        page: currentPage = 1,
        totalResults,
    } = log

    useEffect(() => {
        if (isRequestStale(lastRequestTime, preferredSources, prevSources)) {
            fetchData()
        } else {
            setStories(log.data)
        }
    }, [preferredSources])

    function fetchData(page = 1) {
        getStoriesBySource(preferredSources, page)
            .then((response) => {
                const accumulatedStories = page > 1
                    ? [...stories, ...response.stories]
                    : response.stories
                logRequest({
                    route: pathName,
                    dependancies: preferredSources,
                    data: accumulatedStories,
                    totalResults: response.totalResults,
                    page,
                })
                setStories(accumulatedStories)
                setLoading(false)
            })
    }

    function loadMore() {
        setLoading(true)
        fetchData(currentPage + 1)
    }

    return (
        <div>
            <Head>
                <title>Just News</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>The Headlines</h1>
                <StoriesList stories={stories} />
                {totalResults > stories.length && (
                    <button disabled={loading} onClick={loadMore}>Load more</button>
                )}
            </main>
        </div>
    )
}
