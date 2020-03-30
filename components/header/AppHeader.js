import React from "react";
import Link from "next/link";
import CategoryNav from "../categories/CategoryNav";
import css from "./AppHeader.module.css";

export default function Header() {
    return (
        <header className={css.header}>
            <div className={css.headerTop}>
                <h1 className={css.title}>Just News</h1>
                <Link href="/settings">
                    <a className={css.settings}>Settings</a>
                </Link>
            </div>
            <CategoryNav className={css.nav} />
        </header>
    );
}
