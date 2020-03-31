import React from "react";
import css from "./NewsApiAttribution.module.css";

export default function NewsApiAttribution({ className }) {
    return (
        <small className={`${className} ${css.attribution}`}>
            Powered by <a href="https://newsapi.org">NewsAPI.org</a>
        </small>
    );
}
