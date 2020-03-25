import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import StoriesList from '../../components/stories/StoriesList'
import RequestLogContext, { isRequestStale } from '../../contexts/RequestLogContext'
import MessageContext from '../../contexts/MessageContext'

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

    useEffect(() => {
        if (isRequestStale(lastRequestTime, dependancy, prevDependacy)) {
            fetchData()
        } else {
            setStories(log.data)
        }
    }, [dependancy])

    function fetchData(page = 1) {
        requestFn(dependancy, page)
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
    }

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
                {totalResults > stories.length && (
                    <button disabled={loading} onClick={loadMore}>Load more</button>
                )}
            </main>
        </>
    )
}
