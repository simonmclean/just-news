import React from "react";
import Link from "next/link";

const secureURL = (url) => url.replace("http://", "https://");

export default function StoryCard({ story, showImage }) {
    return (
        <article>
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
                        <a>{story.source.name}</a>
                    </Link>
                </cite>
                <a
                    href={secureURL(story.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {story.title}
                </a>
            </header>
            <section>
                <p>{story.description}</p>
            </section>
            <footer>
                <time>{story.publishedAt}</time>
            </footer>
        </article>
    );
}
