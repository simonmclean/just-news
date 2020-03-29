import React, { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SourcesNav from "../../sources/SourcesNav";
import StoriesList from "../StoriesList/StoriesList";
import RequestLogContext, {
    isRequestStale,
} from "../../../contexts/RequestLogContext";
import MessageContext from "../../../contexts/MessageContext";
import useScrollPos from "../../../hooks/useScrollPos";
import css from './StoriesPage.module.css';

export default function StoriesPage({ pageTitle, pageDeps, fetchData }) {
    const pathName = useRouter().asPath;
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requestLog, logRequest] = useContext(RequestLogContext);
    const [, sendMessage] = useContext(MessageContext);

    // TODO: Maybe just use log.thing for clarity, instead of destructuring?
    const log = requestLog[pathName] || {};
    const {
        lastRequestTime,
        dependancies: prevDependacy,
        page: currentPage = 1,
        totalResults,
    } = log;

    // TODO: Return cleanup
    useEffect(() => {
        if (isRequestStale(lastRequestTime, pageDeps, prevDependacy)) {
            fetchDataHandler();
        } else {
            setStories(log.data);
        }
    }, [fetchDataHandler, pageDeps, prevDependacy, lastRequestTime, log.data]);

    useScrollPos(
        (scrollPos) => {
            const atBottom =
                scrollPos + window.innerHeight >= document.body.scrollHeight;
            const isMore = totalResults > stories.length;
            if (atBottom && isMore && !loading) {
                loadMore();
            }
        },
        [loadMore, totalResults, stories.length, loading]
    );

    const fetchDataHandler = useCallback(
        (page = 1) => {
            fetchData(pageDeps, page)
                .then((response) => {
                    const accumulatedStories =
                        page > 1
                            ? [...stories, ...response.stories]
                            : response.stories;
                    logRequest({
                        route: pathName,
                        dependancies: pageDeps,
                        data: accumulatedStories,
                        totalResults: response.totalResults,
                        page,
                    });
                    setStories(accumulatedStories);
                    setLoading(false);
                })
                .catch((err) => {
                    sendMessage("Error retrieving stories");
                    console.error(err);
                });
        },
        [pageDeps, logRequest, pathName, fetchData, sendMessage, stories]
    );

    function loadMore() {
        setLoading(true);
        fetchDataHandler(currentPage + 1);
    }

    return (
        <>
            <Head>
                <title>{pageTitle} | Just News</title>
            </Head>
            <main>
                <h1 className={css.title}>{pageTitle}</h1>
                <SourcesNav />
                <StoriesList stories={stories} />
                {loading && <p>Loading stories…</p>}
            </main>
        </>
    );
}
