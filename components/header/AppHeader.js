import React from "react";
import Link from "next/link";
import CategoryNav from "../categories/CategoryNav";

export default function Header() {
    return (
        <>
            <Link href="/settings">
                <a>Settings</a>
            </Link>
            <CategoryNav />
        </>
    );
}
