import React from "react";
import PreferredSourcesFieldset from "./PreferredSourcesFieldset";
import ThemeSelector from "./ThemeSelector";
import ImagesToggle from "./ImagesToggle";

export default function Settings() {
    return (
        <main>
            <form>
                <ThemeSelector />
                <ImagesToggle />
                <PreferredSourcesFieldset />
            </form>
        </main>
    );
}
