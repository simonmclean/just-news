import React from "react";
import {
    MdCheckBox as CheckedIcon,
    MdCheckBoxOutlineBlank as UncheckIcon,
} from "react-icons/md";
import css from "./Checkbox.module.css";

export default function Checkbox({
    label,
    value,
    checked,
    onChange,
    className,
}) {
    const icon = checked ? (
        <CheckedIcon />
    ) : (
        <UncheckIcon className={css.uncheckedIcon} />
    );

    return (
        <label className={`${css.label} ${className}`}>
            {icon}
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
                className={css.input}
            />
            {label}
        </label>
    );
}
