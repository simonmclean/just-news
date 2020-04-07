import React from "react";
import css from "./StoryCard.module.css";

export default function StoryCard({ story, showImage }) {
    const canShowImage = showImage && story.urlToImage;

    const attributionNodes = (
        <div className={css.sourceTime}>
            <cite className={css.source}>{story.source.name}</cite>
            <time className={css.dateTime} dateTime={story.publishedAt}>
                {story.relativeTime}
            </time>
        </div>
    );

    return (
        <article className={canShowImage ? css.cardWithImage : ""}>
            {canShowImage && (
                <>
                    {attributionNodes}
                    <a
                        className={css.imageWrapper}
                        href={story.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        <lazy-img src={story.urlToImage}>
                            <img
                                className={css.image}
                                loading="lazy"
                                alt={story.title}
                            />
                        </lazy-img>
                    </a>
                </>
            )}
            <header className={css.header}>
                {!canShowImage && attributionNodes}
                <h3 className={css.title}>
                    <a
                        className={css.title}
                        href={story.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {story.title}
                    </a>
                </h3>
            </header>
            <section className={css.section}>
                <p className={css.description}>{story.description}</p>
            </section>
        </article>
    );
}
