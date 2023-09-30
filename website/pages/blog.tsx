import BlogCTA from '@/comps/blog/cta'
import PostList from '@/comps/blog/list'
import ComingSoonNavbar from '@/comps/comingSoon/navbar'
import Footer from '@/comps/footer'
import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seohead'
import { getPostData, getSortedPostsData } from '@/utils/posts'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {

    const allPosts = getSortedPostsData();
    return {
        props: {
            allPosts,
        },
    };

}

export default function Page({ allPosts }: { allPosts: any }) {

    const [showComingSoon, setShowComingSoon] = useState(true)
	
  	return (
		<main
			className={`flex min-h-screen flex-col items-center px-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="Tip.dev Blog Posts" />

            {!showComingSoon ?
                <Navbar />
            : 
                <ComingSoonNavbar />
            }

            <div className="h-28"> </div>
            
            <div className="flex flex-col items-center w-1/2 mb-20">
                <PostList posts={allPosts} />
            </div>

            <BlogCTA />

            <Footer />

  		</main>
	)
}