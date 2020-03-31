import React, { useContext } from "react";
import UserSettingsContext, {
    SETTINGS,
} from "../../../contexts/UserSettingsContext";
import css from "./ThemeSelector.module.css";

const THEME_OPTIONS = Object.freeze(["auto", "light", "dark"]);

export default function ThemeSelector({ className }) {
    const { theme, setUserSetting } = useContext(UserSettingsContext);

    const onChange = ({ target }) =>
        setUserSetting(SETTINGS.THEME, target.value);

    return (
        <label className={`${className} ${css.wrapper}`}>
            <span className={css.labelText}>Theme</span>
            <select className={css.select} value={theme} onChange={onChange}>
                {THEME_OPTIONS.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}
