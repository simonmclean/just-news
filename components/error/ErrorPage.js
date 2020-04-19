import React from "react";
import css from "./ErrorPage.module.css";

function ErrorPage({ statusCode }) {
    return (
        <div className={css.errorPage}>
            {statusCode && <p>An error {statusCode} occured on the server.</p>}
            {!statusCode && (
                <>
                    <p>An error occured on the client.</p>
                    <p>
                        Please open an issue on{" "}
                        <a
                            href="https://github.com/simonmclean/just-news/issues/new"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>{" "}
                        and include steps to reproduce.
                    </p>
                </>
            )}
        </div>
    );
}

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;
