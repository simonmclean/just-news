import { useState, useEffect } from 'react'
import localforage from 'localforage'

export default function useLocalStorage(key, defaultValue) {
    if (!key) throw new Error('useLocalStorage expects a key')

    const [value, setValue] = useState(null)

    useEffect(() => {
        localforage.getItem(key)
            .then((cachedValue) => {
                if (!cachedValue && defaultValue) {
                    localforage.setItem(key, defaultValue)
                } else {
                    setValue(cachedValue)
                }
            })
    }, [key])

    return [
        value,
        (newValue) => (
            localforage
                .setItem(key, newValue)
                .then(setValue)
        )
    ]
}
