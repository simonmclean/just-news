import React from "react";
import Link from "next/link";

const CATEGORIES = Object.freeze([
    "general",
    "business",
    "science",
    "technology",
    "entertainment",
    "sports",
    "health",
]);

export default function CategoryNav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <a>My News</a>
                    </Link>
                </li>
                {CATEGORIES.map((category) => (
                    <li key={category}>
                        <Link
                            href="/category/[categoryId]"
                            as={`/category/${category}`}
                        >
                            <a>{category}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
