import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSources } from '../utils/requestUtils.js'
import useLocalStorage from '../hooks/useLocalStorage'
import MessageContext from '../contexts/MessageContext'
import SourcesContext from '../contexts/SourcesContext'
import UserSettingsContext, {
    userSettingsReducer,
    userDefaults,
    setTheme,
} from '../contexts/UserSettingsContext'
import Navigation from '../components/header/Navigation'
import RequestLogContext, { requestLogReducer } from '../contexts/RequestLogContext'
import Message from '../components/message/Message'

export default function MyApp({ Component }) {
    const [sources, setSources] = useState([])
    const [requestLog, setRequestLog] = useState({})
    const [message, sendMessage] = useState()
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
        getSources()
            .then(setSources)
            .catch((err) => {
                sendMessage('Error retrieving news sources')
                console.error(err)
            })
    }, [])

    useEffect(() => {
        if (userSettings) {
            setTheme(userSettings.theme)
        }
    }, [userSettings])

    const isSettingsRoute = useRouter().route === '/settings'

    // TODO: Reduce all the context providers
    return (
        <>
            <Head>
                <script type="module" src="/lazy-image-component.js"></script>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {userSettings && (
                <SourcesContext.Provider value={sources}>
                    <RequestLogContext.Provider value={[requestLog, logRequest]}>
                        <UserSettingsContext.Provider value={{...userSettings, setUserSetting}}>
                                <MessageContext.Provider value={[message, sendMessage]}>
                                    <Message/>
                                    {!isSettingsRoute && <Navigation />}
                                    <Component />
                                </MessageContext.Provider>
                        </UserSettingsContext.Provider>
                    </RequestLogContext.Provider>
                </SourcesContext.Provider>
            )}
        </>
    )
}
