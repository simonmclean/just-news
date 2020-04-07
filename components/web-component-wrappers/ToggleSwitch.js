import { createElement, useRef, useEffect } from 'react';
import css from "./ToggleSwitch.module.css";

// Creating a wrapper as web-components can't be controlled component
export default function ToggleSwitch({ checked, onChange }) {
    const el = useRef(null);

    // Set element "checked" based on prop
    useEffect(() => {
        el.current.checked = checked;
    }, [checked]);

    // Listen for the toggle switch change event
    useEffect(() => {
        const currentEl = el.current;
        currentEl.addEventListener("change", onChange);
        return () => currentEl.removeEventListener("change", onChange);
    }, [el, onChange]);

    // Using JSX creates a presentional bug related to initial state
    return createElement(
        'div',
        { className: css.wrapper },
        createElement(
            'toggle-switch',
            {
                ref: el,
                ...(checked && { checked }),
            }
        ),
    );
}
