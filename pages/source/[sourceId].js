import React, { useContext } from "react";
import { useRouter } from "next/router";
import StoriesPage from "../../components/stories/StoriesPage/StoriesPage";
import SourcesContext from "../../contexts/SourcesContext";
import { getStoriesBySource } from "../../utils/requestUtils";

export default function SourceStoriesPage() {
    const { sourceId } = useRouter().query;
    const sourceName = useContext(SourcesContext).find(
        ({ id }) => id === sourceId
    ).name;

    return (
        <StoriesPage
            pageTitle={`Headlines: ${sourceName}`}
            pageDeps={[sourceId]}
            fetchData={getStoriesBySource}
        />
    );
}
