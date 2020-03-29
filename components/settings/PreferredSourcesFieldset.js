import React, { useContext } from "react";
import SourcesContext from "../../contexts/SourcesContext";
import UserSettingsContext, {
    SETTINGS,
} from "../../contexts/UserSettingsContext";

export default function PreferredSourcesFieldset() {
    const sources = useContext(SourcesContext);
    const { preferredSources, setUserSetting } = useContext(
        UserSettingsContext
    );

    function onCheckboxChange({ target }) {
        const newState = (target.checked
            ? [...preferredSources, target.value]
            : preferredSources.filter((id) => id !== target.value)
        ).sort();
        setUserSetting(SETTINGS.PREFERRED_SOURCES, newState);
    }

    return (
        <fieldset>
            <legend>Preferred Sources</legend>
            <ol>
                {sources.map((source) => (
                    <li key={source.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={source.id}
                                checked={preferredSources.includes(source.id)}
                                onChange={onCheckboxChange}
                            />
                            {source.name}
                        </label>
                    </li>
                ))}
            </ol>
        </fieldset>
    );
}
