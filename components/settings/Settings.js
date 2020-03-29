import React from "react";
import Link from "next/link";
import PreferredSourcesFieldset from "./PreferredSourcesFieldset";
import ThemeSelector from "./ThemeSelector";
import ImagesToggle from "./ImagesToggle";

export default function Settings() {
    return (
        <>
            <header>
                <Link href="/">
                    <a>Back</a>
                </Link>
                <h1>Settings</h1>
            </header>
            <main>
                <form>
                    <ThemeSelector />
                    <ImagesToggle />
                    <PreferredSourcesFieldset />
                </form>
            </main>
        </>
    );
}
