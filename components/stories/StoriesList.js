import { useContext } from 'react'
import StoryCard from './StoryCard'
import { pipe, trim, toLower } from 'ramda'
import UserSettingsContext, { SETTINGS } from '../../contexts/UserSettingsContext'

const normalizeStr = pipe(
    str => str.substring(0, 10),
    trim,
    toLower
)

const generateKey = ({ source, title, publishedAt }) => (
    `${source.id}-${normalizeStr(title)}-${publishedAt}`
)

// TODO: Infinite scroll

export default function StoriesList({ stories }) {
    const showImages = useContext(UserSettingsContext)[SETTINGS.SHOW_IMAGES]

    return (
        <ol>
            {stories && stories.map(story =>
                <li key={generateKey(story)}>
                    <StoryCard story={story} showImage={showImages} />
                </li>
            )}
        </ol>
    )
}
