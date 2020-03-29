import React from "react";
import { useRouter } from "next/router";
import StoriesPage from "../../components/stories/StoriesPage/StoriesPage";
import { getStoriesBySource } from "../../utils/requestUtils";

export default function SourceStoriesPage() {
    const { sourceId } = useRouter().query;

    return (
        <StoriesPage
            pageTitle={`Headlines: ${sourceId}`}
            pageDeps={[sourceId]}
            fetchData={getStoriesBySource}
        />
    );
}
