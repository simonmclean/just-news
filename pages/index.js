import React, { useContext } from "react";
import { getStoriesBySource } from "../utils/requestUtils";
import UserSettingsContext from "../contexts/UserSettingsContext";
import StoriesPage from "../components/stories/StoriesPage";

export default function HomePage() {
    const { preferredSources } = useContext(UserSettingsContext);

    return (
        <StoriesPage
            pageTitle="The Headlines"
            dependancy={preferredSources}
            requestFn={getStoriesBySource}
        />
    );
}
