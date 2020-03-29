import React from "react";
import { useRouter } from "next/router";
import StoriesPage from "../../components/stories/StoriesPage";
import { getStoriesBySource } from "../../utils/requestUtils";

export default function SourceStoriesPage() {
    const { sourceId } = useRouter().query;

    return (
        <StoriesPage
            pageTitle={`The Headlines: ${sourceId}`}
            dependancy={[sourceId]}
            requestFn={getStoriesBySource}
        />
    );
}
