// React
import React, { useState, useEffect } from "react";

// Next
import { useRouter } from 'next/router';

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

// TODO: Generic integration of other news APIs
export default function MyApp({ Component }) {
    const router = useRouter();
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

    // First page load cannot be a dynamic route when app
    // is served statically
    useEffect(() => {
        router.push("/");
    }, []);

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
                                <small className="copyright">
                                    © 2020 Simon Mclean
                                </small>
                            </MessageContext.Provider>
                        </UserSettingsContext.Provider>
                    </RequestLogContext.Provider>
                </SourcesContext.Provider>
            )}
        </>
    );
}
