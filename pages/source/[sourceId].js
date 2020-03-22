import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { getStoriesBySource } from '../../utils/requestUtils'
import StoriesList from '../../components/stories/StoriesList'
import RequestLogContext, { isRequestStale } from '../../contexts/RequestLogContext'

export default function SourceStoriesPage() {
    const { sourceId } = useRouter().query
    const [stories, setStories] = useState([])
    const { requestLog, logRequest } = useContext(RequestLogContext)
    const pathName = useRouter().asPath

    // TODO: Cleanup with { lastRequestTime } = requestLog?.['/']
    const log = requestLog[pathName] || {}
    const { lastRequestTime, dependancies: prevSourceId } = log

    useEffect(() => {
        if (isRequestStale(lastRequestTime, sourceId, prevSourceId)) {
            getStoriesBySource([sourceId]).then(stories => {
                setStories(stories)
                logRequest({
                    route: pathName,
                    dependancies: sourceId,
                    data: stories,
                })
            })
        } else {
            setStories(log.data)
        }
    }, [sourceId])

    // TODO: Error handling

    return (
        <main>
            <h1>The Headlines from {sourceId}</h1>
            <StoriesList stories={stories}/>
        </main>
    )
}
