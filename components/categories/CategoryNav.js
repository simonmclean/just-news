import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import css from "./CategoryNav.module.css";

const CATEGORIES = Object.freeze([
    "general",
    "business",
    "science",
    "technology",
    "entertainment",
    "sports",
    "health",
]);

export default function CategoryNav({ className }) {
    const { query } = useRouter();

    const isActiveClass = (categoryId) =>
        categoryId === query.categoryId ? css.linkActive : null;

    return (
        <nav className={`${className} ${css.nav}`}>
            <ul className={css.list}>
                <li className={css.listItem}>
                    <Link href="/">
                        <a className={`${css.link} ${isActiveClass()}`}>
                            My News
                        </a>
                    </Link>
                </li>
                {CATEGORIES.map((category) => (
                    <li key={category} className={css.listItem}>
                        <Link
                            href="/category/[categoryId]"
                            as={`/category/${category}`}
                        >
                            <a
                                className={`${css.link} ${isActiveClass(
                                    category
                                )}`}
                            >
                                {category}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
