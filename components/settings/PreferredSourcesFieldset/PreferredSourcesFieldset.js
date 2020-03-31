import React, { useContext } from "react";
import SourcesContext from "../../../contexts/SourcesContext";
import UserSettingsContext, {
    SETTINGS,
} from "../../../contexts/UserSettingsContext";
import css from "./PreferredSourcesFieldset.module.css";

// TODO: Introduce "Blacklist" option that blocks sources from
// being shown in any categories
export default function PreferredSourcesFieldset({ className }) {
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
        <fieldset className={`${className} ${css.fieldset}`}>
            <div className={css.legendWrapper}>
                <legend>Preferred Sources</legend>
            </div>
            <ol className={css.list}>
                {sources.map((source) => (
                    <li key={source.id}>
                        <label className={css.label}>
                            <input
                                type="checkbox"
                                value={source.id}
                                checked={preferredSources.includes(source.id)}
                                onChange={onCheckboxChange}
                                className={css.checkbox}
                            />
                            {source.name}
                        </label>
                    </li>
                ))}
            </ol>
        </fieldset>
    );
}
