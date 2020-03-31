import React from "react";
import PreferredSourcesFieldset from "./PreferredSourcesFieldset/PreferredSourcesFieldset";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import ImagesToggle from "./ImagesToggle/ImagesToggle";
import css from "./Settings.module.css";

export default function Settings() {
    return (
        <main className={css.main}>
            <form>
                <ThemeSelector className={css.field} />
                <ImagesToggle className={css.field} />
                <PreferredSourcesFieldset className={css.field} />
            </form>
        </main>
    );
}
