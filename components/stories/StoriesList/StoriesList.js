import React, { useContext } from "react";
import StoryCard from "../StoryCard/StoryCard";
import { pipe, trim, toLower } from "ramda";
import UserSettingsContext, {
    SETTINGS,
} from "../../../contexts/UserSettingsContext";
import css from "./StoriesList.module.css"

const normalizeStr = pipe((str) => str.substring(0, 10), trim, toLower);

const generateKey = ({ source, title, publishedAt }) =>
    `${source.id}-${normalizeStr(title)}-${publishedAt}`;

export default function StoriesList({ stories }) {
    const showImages = useContext(UserSettingsContext)[SETTINGS.SHOW_IMAGES];

    return (
        <ol className={css.list}>
            {stories &&
                stories.map((story) => (
                    <li className={css.listItem} key={generateKey(story)}>
                        <StoryCard story={story} showImage={showImages} />
                    </li>
                ))}
        </ol>
    );
}
