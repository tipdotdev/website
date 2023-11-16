import ColorDetailsModal from '@/comps/modals/colorDetailsModal'
import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seohead'
import Toast from '@/comps/toast'
import useModal from '@/hooks/useModal'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const { openModal } = useModal()

    const [colorDetails, setColorDetails] = useState(undefined as any | undefined)
	
  	return (
		<main
			className={`flex min-h-screen flex-col justify-center items-center sm:px-10 px-2 pt-24 pb-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev | Coming Soon" />

            <Navbar />

            <div className='flex flex-col justify-start items-start w-full'>
                <h1 className='text-4xl font-bold mb-2'>Colors</h1>
                <p className='text-zinc-400 mb-4'>Click on a color to view its various values</p>
                <div className='flex flex-row flex-wrap sm:gap-4 gap-2 mt-4 w-screen'>
                    <div className='bg-base-200 w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "base-200",
                                    rgb: "24, 25, 33",
                                    hex: "#181921",
                                    hsl: "233, 16%, 115"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-base-300 w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "base-300",
                                    rgb: "9, 9, 13",
                                    hex: "#09090d",
                                    hsl: "240, 18%, 4%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-base-content w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "base-content",
                                    rgb: "248, 248, 241",
                                    hex: "#f8f8f1",
                                    hsl: "60, 33%, 96%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-primary w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "primary",
                                    rgb: "254, 122, 198",
                                    hex: "#fe7ac6",
                                    hsl: "325, 99%, 74%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-primary-content w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "primary-content",
                                    rgb: "48, 28, 38",
                                    hex: "#301c26",
                                    hsl: "330, 26%, 15%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-secondary w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "secondary",
                                    rgb: "190, 149, 248",
                                    hex: "#be95f8",
                                    hsl: "265, 88%, 78%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-secondary-content w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "secondary-content",
                                    rgb: "40, 33, 48",
                                    hex: "#282130",
                                    hsl: "268, 19%, 16%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-accent w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "accent",
                                    rgb: "255, 183, 107",
                                    hex: "#ffb76b",
                                    hsl: "31, 100%, 71%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-accent-content w-20 h-120 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "accent-content",
                                    rgb: "50, 38, 26",
                                    hex: "#32261a",
                                    hsl: "30, 32%, 15%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-neutral w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "neutral",
                                    rgb: "65, 69, 87",
                                    hex: "#414557",
                                    hsl: "229, 14%, 30%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-neutral-content w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "neutral-content",
                                    rgb: "214, 215, 219",
                                    hex: "#d6d7db",
                                    hsl: "228, 6%, 85%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-info w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "info",
                                    rgb: "139, 232, 253",
                                    hex: "#8be8fd",
                                    hsl: "191, 97%, 77%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-info-content w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "info-content",
                                    rgb: "32, 46, 49",
                                    hex: "#202e31",
                                    hsl: "191, 21%, 16%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-success w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "success",
                                    rgb: "82, 249, 124",
                                    hex: "#52f97c",
                                    hsl: "135, 93%, 65%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-success-content w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "success-content",
                                    rgb: "25, 46, 28",
                                    hex: "#192e1c",
                                    hsl: "129, 30%, 14%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-warning w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "warning",
                                    rgb: "240, 250, 137",
                                    hex: "#f0fa89",
                                    hsl: "65, 92%, 76%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-warning-content w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "warning-content",
                                    rgb: "45, 46, 30",
                                    hex: "#2d2e1e",
                                    hsl: "64, 21%, 15%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-error w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "error",
                                    rgb: "255, 87, 86",
                                    hex: "#ff5756",
                                    hsl: "0, 100%, 67%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                    <div className='bg-error-content w-20 h-20 rounded-lg cursor-pointer' 
                        onClick={
                            () => {
                                setColorDetails({
                                    varName: "error-content",
                                    rgb: "49, 24, 22",
                                    hex: "#311816",
                                    hsl: "4, 38%, 14%"
                                })
                                openModal("colordetails")
                            }
                        }
                    ></div>
                </div>
            </div>

            <ColorDetailsModal
                details={colorDetails}
            />

  		</main>
	)
}