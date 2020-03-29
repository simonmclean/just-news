import React, {
    useEffect,
    useState,
    useContext,
    useCallback,
} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import StoriesList from '../../components/stories/StoriesList'
import RequestLogContext, { isRequestStale } from '../../contexts/RequestLogContext'
import MessageContext from '../../contexts/MessageContext'
import useScrollPos from '../../hooks/useScrollPos'

// TODO: I'm not using requestFn properly...
// The function should be fired to expose the "fire" and "abort" functions
export default function StoriesPage({ pageTitle, dependancy, requestFn }) {
    const pathName = useRouter().asPath
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [requestLog, logRequest] = useContext(RequestLogContext)
    const [, sendMessage] = useContext(MessageContext)

    // TODO: Cleanup with { lastRequestTime } = requestLog?.['/']
    const log = requestLog[pathName] || {}
    const {
        lastRequestTime,
        dependancies: prevDependacy,
        page: currentPage = 1,
        totalResults,
    } = log

    // TODO: Return cleanup
    useEffect(() => {
        if (isRequestStale(lastRequestTime, dependancy, prevDependacy)) {
            fetchData()
        } else {
            setStories(log.data)
        }
    }, [fetchData, dependancy, prevDependacy, lastRequestTime, log.data])

    useScrollPos((scrollPos) => {
        const atBottom = (scrollPos + window.innerHeight) >= document.body.scrollHeight
        const isMore = totalResults > stories.length
        if (atBottom && isMore && !loading) {
            loadMore()
        }
    }, [loadMore, totalResults, stories.length, loading])

    const fetchData = useCallback(
        (page = 1) => requestFn(dependancy, page)
            .fire()
            .then(response => {
                const accumulatedStories = page > 1
                    ? [...stories, ...response.stories]
                    : response.stories
                logRequest({
                    route: pathName,
                    dependancies: dependancy,
                    data: accumulatedStories,
                    totalResults: response.totalResults,
                    page,
                })
                setStories(accumulatedStories)
                setLoading(false)
            })
            .catch((err) => {
                sendMessage('Error retrieving stories')
                console.error(err)
            })
         , [
             dependancy,
             logRequest,
             pathName,
             requestFn,
             sendMessage,
             stories
        ]
    )

    function loadMore() {
        setLoading(true)
        fetchData(currentPage + 1)
    }

    return (
        <>
            <Head>
                <title>{pageTitle} | Just News</title>
            </Head>
            <main>
                <h1>{pageTitle}</h1>
                <StoriesList stories={stories}/>
                {loading && <p>Loading stories…</p>}
            </main>
        </>
    )
}
