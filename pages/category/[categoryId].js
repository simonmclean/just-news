import React from 'react'
import { useRouter } from 'next/router'
import { getStoriesByCategory } from '../../utils/requestUtils'
import StoriesPage from '../../components/stories/StoriesPage'

export default function CategoryStoriesPage() {
    const { categoryId } = useRouter().query

    return (
        <StoriesPage
            pageTitle={`The Headlines: ${categoryId}`}
            dependancy={categoryId}
            requestFn={getStoriesByCategory}
        />
    )
}
