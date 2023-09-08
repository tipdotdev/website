import Navbar from '@/comps/navbar'
import PlusIcon from '@/comps/plusIcon'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
    return (
        <main
			className={`flex min-h-screen flex-col justify-center items-center px-10 py-10 ${inter.className}`}
	  		data-theme="dracula"
  		>

            <Navbar />
            <PlusIcon className="h-5 w-5" />

        </main>
    )
}