import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import StoriesList from '../../components/stories/StoriesList'
import RequestLogContext, { isRequestStale } from '../../contexts/RequestLogContext'

export default function StoriesPage({ dependancy, requestFn }) {
    const pathName = useRouter().asPath
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const { requestLog, logRequest } = useContext(RequestLogContext)

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
    }

    function loadMore() {
        setLoading(true)
        fetchData(currentPage + 1)
    }

    return (
        <main>
            <h1>The Headlines: {dependancy}</h1>
            <StoriesList stories={stories}/>
            {totalResults > stories.length && (
                <button disabled={loading} onClick={loadMore}>Load more</button>
            )}
        </main>
    )
}
