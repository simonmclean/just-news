import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdSettings, MdArrowBack } from 'react-icons/md';
import CategoryNav from "../categories/CategoryNav";
import css from "./AppHeader.module.css";

export default function Header() {
    const isSettingsRoute = useRouter().route === "/settings";

    return (
        <header className={css.header}>
            <div className={css.headerTop}>
                {isSettingsRoute && (
                    <Link href="/">
                        <a className={css.back}>
                            <MdArrowBack />
                            <span className={css.backText}>Back</span>
                        </a>
                    </Link>
                )}
                <h1 className={css.title}>Just News</h1>
                {!isSettingsRoute && (
                    <Link href="/settings">
                        <a className={css.settings}>
                            <span className="for-sr">Settings</span>
                            <MdSettings />
                        </a>
                    </Link>
                )}
            </div>
            {!isSettingsRoute && <CategoryNav className={css.nav} />}
        </header>
    );
}
