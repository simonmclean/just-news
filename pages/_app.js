import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSources } from '../utils/requestUtils.js'
import useLocalStorage from '../hooks/useLocalStorage'
import SourcesContext from '../contexts/SourcesContext'
import UserSettingsContext, {
    userSettingsReducer,
    userDefaults,
    setTheme,
} from '../contexts/UserSettingsContext'
import Header from '../components/header/Header'
import RequestLogContext, { requestLogReducer } from '../contexts/RequestLogContext'

export default function MyApp({ Component }) {
    const [sources, setSources] = useState([])
    const [requestLog, setRequestLog] = useState({})
    const [userSettings, setUserSettings] = useLocalStorage('userSettings', userDefaults)

    function setUserSetting(key, value) {
        const newState = userSettingsReducer(userSettings, key, value)
        setUserSettings(newState)
    }

    function logRequest(record) {
        const newLog = requestLogReducer(requestLog, record)
        setRequestLog(newLog)
    }

    useEffect(() => {
        getSources().then(setSources)
    }, [])

    useEffect(() => {
        if (userSettings) {
            setTheme(userSettings.theme)
        }
    }, [userSettings])

    const isSettingsRoute = useRouter().route === '/settings'

    return (
        <>
            <Head>
                <script type="module" src="/lazy-image-component.js"></script>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {userSettings && (
                <SourcesContext.Provider value={sources}>
                    <RequestLogContext.Provider value={{requestLog, logRequest}}>
                        <UserSettingsContext.Provider value={{...userSettings, setUserSetting}}>
                            {!isSettingsRoute && <Header />}
                            <Component />
                        </UserSettingsContext.Provider>
                    </RequestLogContext.Provider>
                </SourcesContext.Provider>
            )}
        </>
    )
}
