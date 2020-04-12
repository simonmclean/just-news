import React, { useContext } from "react";
import SourcesContext from "../../../contexts/SourcesContext";
import UserSettingsContext, {
    SETTINGS,
} from "../../../contexts/UserSettingsContext";
import NewsApiAttribution from "../../NewsApiAttribution/NewsApiAttribution";
import Checkbox from "../../Checkbox/Checkbox";
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
                <legend className={css.legend}>Preferred Sources</legend>
                <NewsApiAttribution />
            </div>
            <ol className={css.list}>
                {sources.map((source) => (
                    <li key={source.id}>
                        <Checkbox
                            value={source.id}
                            label={source.name}
                            checked={preferredSources.includes(source.id)}
                            onChange={onCheckboxChange}
                            className={css.checkbox}
                        />
                    </li>
                ))}
            </ol>
        </fieldset>
    );
}
