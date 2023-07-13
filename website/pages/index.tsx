import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
		>
			<Head>
				<title>tip.dev</title>
				<link rel="icon" href="/logo.png" />
			</Head>
			<img src={'/logo-no-bg.png'} alt="tip.dev logo" width={200} height={200} />
		</main>
  	)
}
