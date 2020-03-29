import React from "react";
import { useRouter } from "next/router";
import { getStoriesByCategory } from "../../utils/requestUtils";
import StoriesPage from "../../components/stories/StoriesPage/StoriesPage";

export default function CategoryStoriesPage() {
    const { categoryId } = useRouter().query;

    return (
        <StoriesPage
            pageTitle={`Headlines: ${categoryId}`}
            pageDeps={categoryId}
            fetchData={getStoriesByCategory}
        />
    );
}
