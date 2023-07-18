import Head from "next/head";

export default function SEOHead(props: { title: string }) {
    return (
        <Head>
            <title>{props.title || "tip.dev"}</title>
            <link rel="icon" href="/logo-no-bg-v3.png" />
            <meta property="description" content="Tip.dev is a platform for developers to make money easily from fans of their work." />
        </Head>
    )
}