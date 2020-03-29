import React, { useContext } from "react";
import Link from "next/link";
import SourcesContext from "../../contexts/SourcesContext";
import UserSettingsContext from "../../contexts/UserSettingsContext";

export default function SourcesNav() {
    const { preferredSources } = useContext(UserSettingsContext);

    const sources = useContext(SourcesContext).filter(({ id }) =>
        preferredSources.includes(id)
    );

    return (
        <nav>
            <ul>
                {sources.map((source) => (
                    <li key={source.id}>
                        <Link
                            href="/source/[sourceId]"
                            as={`/source/${source.id}`}
                        >
                            <a>{source.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
