import React, { useContext } from "react";
import { getStoriesBySource } from "../utils/requestUtils";
import UserSettingsContext from "../contexts/UserSettingsContext";
import StoriesPage from "../components/stories/StoriesPage/StoriesPage";

export default function HomePage() {
    const { preferredSources } = useContext(UserSettingsContext);

    // TODO: Instead of setting default sources, show a message
    // directing the user to the settings page
    return (
        <StoriesPage
            pageTitle="Headlines"
            pageDeps={preferredSources}
            fetchData={getStoriesBySource}
        />
    );
}
