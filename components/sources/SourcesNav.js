import React, { useContext } from "react";
import Link from "next/link";
import SourcesContext from "../../contexts/SourcesContext";
import UserSettingsContext from "../../contexts/UserSettingsContext";
import css from "./SourcesNav.module.css";

export default function SourcesNav() {
    const { preferredSources } = useContext(UserSettingsContext);

    const sources = useContext(SourcesContext).filter(({ id }) =>
        preferredSources.includes(id)
    );

    return (
        <nav className={css.nav}>
            <ul className={css.list}>
                {sources.map((source) => (
                    <li key={source.id} className={css.listItem}>
                        <Link
                            href="/source/[sourceId]"
                            as={`/source/${source.id}`}
                        >
                            <a className={css.link}>{source.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
