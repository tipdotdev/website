import Head from "next/head";

export default function SEOHead(props:any) {
    return (
        <Head>
            <title>{props.title || "tip.dev"}</title>
            <link rel="icon" href={props.icon || "/static/logo.png"} />
            <meta property="description" content={props.description || "Tip.dev is the easiest way for developers to make money doing what they love"} />

            <meta name="keywords" content="tip.dev, tip, dev, tipdotdev, ko-fi, coffee, buymeacoffee, tips, developer, money, easy, make money, devs, linktree, link, tree, patreon, short, url, ui, api, docs, discord, server, fund, crowd, source, open" />

            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="image" content={props.image || "/static/logo.png"} />

            <meta property="og:title" content={props.title || "tip.dev"} />
            <meta property="og:description" content={props.description || "Tip.dev is the easiest way for developers to make money doing what they love"} />
            <meta property="og:url" content={'tip.dev'} />
            <meta property="og:image" content={props.image || "/static/logo.png"} />
            <meta property="og:site_name" content={'tip.dev'} />

            <meta name="theme-color" content="#fe7ac6" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/logo.png" />

            <meta property="twitter:image" content={props.image || "https://tip.dev/static/logo.png"} />
            <meta property="twitter:card" content={props.largeImage || "https://tip.dev/static/logo.png"} />
            <meta property="twitter:title" content={props.title || "tip.dev"} />
            <meta property="twitter:description" content={props.description || "Tip.dev is the easiest way for developers to make money doing what they love"} />

            <meta property="og:image" content={props.image || "/static/logo.png"} />
            <meta property="og:title" content={props.title || "tip.dev"} />
            <meta property="og:description" content={props.description || "Tip.dev is the easiest way for developers to make money doing what they love"} />
            <meta property="og:url" content={props.url || "https://tip.dev"} />
        </Head>
    )
}