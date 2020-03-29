import React from 'react'
import Link from 'next/link'
import CategoryNav from '../categories/CategoryNav'
import SourcesNav from '../sources/SourcesNav'

export default function Header() {
    return (
        <>
            <Link href='/settings'>
                <a>Settings</a>
            </Link>
            <CategoryNav />
            <SourcesNav />
        </>
    )
}
