import React from "react";
import css from "./StoryCard.module.css";

const secureURL = (url) => url.replace("http://", "https://");

export default function StoryCard({ story, showImage }) {
    const canShowImage = showImage && story.urlToImage;

    const renderAttribution = () => (
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
                    {renderAttribution()}
                    <lazy-img src={secureURL(story.urlToImage)}>
                        <img
                            className={css.image}
                            loading="lazy"
                            alt={story.title}
                        />
                    </lazy-img>
                </>
            )}
            <header className={css.header}>
                {!canShowImage && renderAttribution()}
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
            <section className={css.section}>
                <p className={css.description}>{story.description}</p>
            </section>
        </article>
    );
}
