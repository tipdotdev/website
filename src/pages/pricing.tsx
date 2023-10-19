import Footer from '@/comps/footer'
import Navbar from '@/comps/navbar'
import PlusIcon from '@/comps/plusIcon'
import FeatureGrid from '@/comps/pricing/featureGrid'
import FeatureTable from '@/comps/pricing/featureTable'
import PricingCards from '@/comps/pricing/pricingCards'
import SEOHead from '@/comps/seohead'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Page() {

    return (
        <main
			className={`flex min-h-screen flex-col justify-center items-center px-10  ${inter.className}`}
	  		data-theme="dracula"
  		>   

            <SEOHead title="{$} | Pricing" />

            <Navbar />
            
            <div className='flex flex-col justify-start items-center w-full min-h-screen mt-10 mb-10'>
                <h1 className='text-5xl font-bold text-center mb-5 mt-16'>
                    Transparent Pricing
                </h1>

                <p className='text-md text-center mb-2 text-zinc-400'>
                    We strive to provide the most open and transparent pricing possible. No hidden fees. Your money is yours.
                </p>

                <div className='w-[80%] mt-6'>
                    <PricingCards />

                    <div className='flex flex-col justify-center items-center w-full mt-24'>
                        <h1 className='text-3xl font-bold text-center mb-5'>
                            Included in all plans
                        </h1>
                        <FeatureGrid />
                    </div>

                    <div className='flex flex-col justify-center items-center w-full mt-24'>

                        <FeatureTable />

                    </div>
                </div>
                    
            </div>

            <Footer />

        </main>
    )
}