import Head from "next/head";

export default function SEOHead(props: { title: string }) {
    return (
        <Head>
            <title>{props.title || "tip.dev"}</title>
            <link rel="icon" href="/logo-no-bg-v3.png" />
        </Head>
    )
}