import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { getStoriesByCategory } from '../../utils/requestUtils'
import StoriesList from '../../components/stories/StoriesList'
import RequestLogContext, { isRequestStale } from '../../contexts/RequestLogContext'

export default function CategoryStoriesPage() {
    const router = useRouter()
    const { categoryId } = router.query
    const pathName = router.asPath
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const { requestLog, logRequest } = useContext(RequestLogContext)

    // TODO: Cleanup with { lastRequestTime } = requestLog?.['/']
    const log = requestLog[pathName] || {}
    const {
        lastRequestTime,
        dependancies: prevCategoryId,
        page: currentPage = 1,
        totalResults,
    } = log

    useEffect(() => {
        if (isRequestStale(lastRequestTime, categoryId, prevCategoryId)) {
            fetchData()
        } else {
            setStories(log.data)
        }
    }, [categoryId])

    function fetchData(page = 1) {
        getStoriesByCategory(categoryId, page)
            .then(response => {
                const accumulatedStories = page > 1
                    ? [...stories, ...response.stories]
                    : response.stories
                logRequest({
                    route: pathName,
                    dependancies: categoryId,
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
            <h1>The Headlines: {categoryId}</h1>
            <StoriesList stories={stories}/>
            {totalResults > stories.length && (
                <button disabled={loading} onClick={loadMore}>Load more</button>
            )}
        </main>
    )
}
