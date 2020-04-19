import React, { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR, { useSWRPages } from "swr";
import SourcesNav from "../../sources/SourcesNav";
import StoriesList from "../StoriesList/StoriesList";
import NewsApiAttribution from "../../NewsApiAttribution/NewsApiAttribution";
import MessageContext from "../../../contexts/MessageContext";
import useScrollPos from "../../../hooks/useScrollPos";
import { PAGE_SIZE } from "../../../utils/requestUtils";
import css from "./StoriesPage.module.css";

const UPDATE_THROTTLE_TIME = 1000 * 60 * 15; // 15 minutes

export default function StoriesPage({ pageTitle, pageDeps, fetchData }) {
    const pathName = useRouter().asPath;
    const [, setMessage] = useContext(MessageContext);
    const { pages, isReachingEnd, loadMore } = useSWRPages(
        // Key
        [pathName, pageDeps].flat(),

        // "pages" component
        ({ offset, withSWR }) => {
            const { data, error } = withSWR(
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useSWR(
                    [offset, pageDeps].flat(),
                    (offset, ...pageDeps) => {
                        return fetchData(pageDeps, offset || 1);
                    },
                    {
                        dedupingInterval: UPDATE_THROTTLE_TIME,
                        focusThrottleInterval: UPDATE_THROTTLE_TIME,
                    }
                )
            );

            if (error) {
                setMessage("Error fetching stories");
                console.error(error);
            }

            if (!data)
                return <p className={css.loadingText}>Loading stories…</p>;

            return <StoriesList stories={data.stories} />;
        },

        // Defines the offset value that's passed to the "pages" component
        // Used for pagination
        ({ data }) => {
            const { params, totalResults, stories } = data;
            const cachedResultsCount =
                params.page === 1
                    ? stories.length
                    : (params.page - 1) * PAGE_SIZE + stories.length;
            return cachedResultsCount < totalResults ? params.page + 1 : null;
        },

        // Deps of the "pages" coomponent
        [fetchData, setMessage]
    );

    useScrollPos(
        (scrollPos) => {
            const atBottom =
                scrollPos + window.innerHeight >= document.body.scrollHeight;
            if (atBottom && !isReachingEnd) {
                loadMore();
            }
        },
        [loadMore, isReachingEnd]
    );

    // TODO: Show stories count next to page title
    return (
        <>
            <Head>
                <title>{pageTitle} | Just News</title>
            </Head>
            <main>
                <h2 className={css.title}>{pageTitle}</h2>
                <NewsApiAttribution className={css.attribution} />
                {pathName === "/" && <SourcesNav />}
                <ol className={css.storiesList}>{pages}</ol>
                {isReachingEnd && (
                    <p className={css.noMoreHeadlines}>No more stories</p>
                )}
            </main>
        </>
    );
}
