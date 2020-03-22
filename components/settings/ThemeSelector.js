import { useContext } from 'react'
import UserSettingsContext, { SETTINGS } from '../../contexts/UserSettingsContext'

const THEME_OPTIONS = Object.freeze([
    'auto',
    'light',
    'dark',
])

export default function ThemeSelector() {
    const { theme, setUserSetting } = useContext(UserSettingsContext)

    const onChange = ({ target }) => setUserSetting(SETTINGS.THEME, target.value)

    return (
        <label>
            <span>Theme</span>
            <select value={theme} onChange={onChange}>
                {THEME_OPTIONS.map(option =>
                    <option
                        value={option}
                        key={option}
                    >
                        {option}
                    </option>
                )}
            </select>
        </label>
    )
}
