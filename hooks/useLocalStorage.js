import { useState, useEffect } from 'react'
import localforage from 'localforage'

export default function useLocalStorage(key, defaultValue) {
    if (!key) throw new Error('useLocalStorage expects a key')
    if (!defaultValue) throw new Error('useLocalStorage expects a defaultValue')

    const [value, setValue] = useState(null)

    useEffect(() => {
        localforage.getItem(key)
            .then((cachedValue) => {
                if (!cachedValue) {
                    localforage.setItem(key, defaultValue)
                }
                setValue(cachedValue ? cachedValue : defaultValue)
            })
    }, [defaultValue, key])

    return [
        value,
        (newValue) => (
            localforage
                .setItem(key, newValue)
                .then(setValue)
        )
    ]
}
