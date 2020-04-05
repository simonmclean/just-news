import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <script
                        type="module"
                        src="/lazy-image-component.js"
                    ></script>
                    <script
                        type="module"
                        src="/toggle-switch-component.js"
                    ></script>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta name="robots" content="noindex" />
                    <meta
                        name="description"
                        content="Just News provides the latest headlines from sources you choose, without the algorithmic manipulation associated with social media feeds."
                    />
                    <meta name="theme-color" content="#1fb5a0" />
                </Head>
                <body>
                    <noscript>
                        Sorry, but this application requires JavaScript to run.
                    </noscript>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
