import SEOHead from '@/comps/seohead';
import { getPostData } from '../../utils/posts';
import { Inter } from 'next/font/google'
import Navbar from '@/comps/navbar';
import Footer from '@/comps/footer';

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
    // Add the "await" keyword like this:
    const postData = await getPostData('cookies');
  
    return {
      props: {
        postData,
      },
    };
}

export default function page(postData: any) {
    return (
        <main
			className={`flex min-h-screen flex-col justify-center items-center ${inter.className} overflow-x-hidden`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev" />
            <Navbar />

            <div className="h-24"></div>

            <div className="prose prose-lg max-w-none  sm:px-[10vw] px-5">
                <h1>{postData.postData.title}</h1>
                <div className='w-full' dangerouslySetInnerHTML={{ __html: postData.postData.contentHtml }} />
            </div>

            <Footer />

        </main>
    )
}