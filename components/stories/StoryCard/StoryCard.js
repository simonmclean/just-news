import React from "react";
import Link from "next/link";
import css from "./StoryCard.module.css";

const secureURL = (url) => url.replace("http://", "https://");

export default function StoryCard({ story, showImage }) {
    return (
        <article className={css.card}>
            {showImage && story.urlToImage && (
                <lazy-img src={secureURL(story.urlToImage)}>
                    <img loading="lazy" alt={story.title} />
                </lazy-img>
            )}
            <header>
                <cite>
                    <Link
                        href="/source/[sourceId]"
                        as={`/source/${story.author}`}
                    >
                        <a className={css.citeLink}>{story.source.name}</a>
                    </Link>
                </cite>
                <time className={css.dateTime} dateTime={story.publishedAt}>
                    {story.relativeTime}
                </time>
                <h3 className={css.title}>
                    <a
                        className={css.title}
                        href={secureURL(story.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {story.title}
                    </a>
                </h3>
            </header>
            <section>
                <p className={css.description}>{story.description}</p>
            </section>
        </article>
    );
}
