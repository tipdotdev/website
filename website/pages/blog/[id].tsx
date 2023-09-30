import SEOHead from "@/comps/seohead";
import { getAllPostIds, getPostData } from "@/utils/posts";
import { useState } from "react";
import { Inter } from 'next/font/google'
import Navbar from "@/comps/navbar";
import ComingSoonNavbar from "@/comps/comingSoon/navbar";
import Footer from "@/comps/footer";
import BlogCTA from "@/comps/blog/cta";

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps({ params }: { params: any }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Page({ postData }: { postData: any }) {
    const [showComingSoon, setShowComingSoon] = useState(true)

    const readableDate = new Date(postData.date).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    )

    console.log(postData)
    return (
		<main
			className={`flex min-h-screen flex-col items-center px-4 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title={postData.title} description={postData.description} image={postData.thumbnail} />

            {!showComingSoon ?
                <Navbar />
            : 
                <ComingSoonNavbar />
            }

            <div className="h-28"> </div>
            
            <div className="flex flex-col text-left md:w-1/2 w-full mb-20">

                <img src={postData.thumbnail} className="rounded-2xl w-fit" />

                <p className="text-sm text-zinc-400 mt-4">Published on {readableDate} by {postData.author}</p>

                <h1 className="text-4xl font-black mt-4">{postData.title}</h1>

                <p className="text-sm text-zinc-400 mt-2">{postData.description}</p>

                <span className="divider mt-4"/>

                <div className="prose prose-md mt-4"
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                >
                </div>
            </div>

            <div className="flex flex-col items-center sm:w-1/2 w-full">
                <BlogCTA />
            </div>

            <Footer />

  		</main>
	)
}