// React
import React, { useState, useEffect } from "react";

// Next
import Head from "next/head";

// Custom hooks
import useLocalStorage from "../hooks/useLocalStorage";

// Contexts
import MessageContext from "../contexts/MessageContext";
import SourcesContext from "../contexts/SourcesContext";
import UserSettingsContext, {
    userSettingsReducer,
    userDefaults,
    setTheme,
} from "../contexts/UserSettingsContext";
import RequestLogContext, {
    requestLogReducer,
} from "../contexts/RequestLogContext";

// Components
import AppHeader from "../components/header/AppHeader";
import Message from "../components/message/Message";

// Utils
import { getSources } from "../utils/requestUtils.js";

// CSS
import "../style/app.css";

// TODO: Meta description and robots
// TODO: Copyright
// TODO: Error page
// TODO: Generic integration of other news APIs
export default function MyApp({ Component }) {
    const [sources, setSources] = useState([]);
    const [requestLog, setRequestLog] = useState({});
    const [message, sendMessage] = useState();
    const [userSettings, setUserSettings] = useLocalStorage(
        "userSettings",
        userDefaults
    );

    function setUserSetting(key, value) {
        const newState = userSettingsReducer(userSettings, key, value);
        setUserSettings(newState);
    }

    // TODO: Maybe add the request log to the cache?
    // Improves load time and reduces the number of API calls
    function logRequest(record) {
        const newLog = requestLogReducer(requestLog, record);
        setRequestLog(newLog);
    }

    useEffect(() => {
        getSources()
            .then(setSources)
            .catch((err) => {
                sendMessage("Error retrieving news sources");
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (userSettings) {
            setTheme(userSettings.theme);
        }
    }, [userSettings]);

    const appReady = !!sources.length && !!userSettings;

    // TODO: Reduce all the context providers
    return (
        <>
            <Head>
                <script type="module" src="/lazy-image-component.js"></script>
                <script type="module" src="/toggle-switch-component.js"></script>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="robots" content="noindex" />
            </Head>
            {appReady && (
                <SourcesContext.Provider value={sources}>
                    <RequestLogContext.Provider
                        value={[requestLog, logRequest]}
                    >
                        <UserSettingsContext.Provider
                            value={{ ...userSettings, setUserSetting }}
                        >
                            <MessageContext.Provider
                                value={[message, sendMessage]}
                            >
                                <Message />
                                <AppHeader />
                                <Component />
                            </MessageContext.Provider>
                        </UserSettingsContext.Provider>
                    </RequestLogContext.Provider>
                </SourcesContext.Provider>
            )}
        </>
    );
}
