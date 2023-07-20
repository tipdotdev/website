import SEOHead from '@/comps/seohead';
import { getPostData } from '../utils/posts';
import { Inter } from 'next/font/google'
import Navbar from '@/comps/navbar';
import DashboardFooter from '@/comps/dashboardFooter';

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
    // Add the "await" keyword like this:
    const postData = await getPostData('terms');
  
    return {
      props: {
        postData,
      },
    };
}

export default function page(postData: any) {
    console.log(postData)
    return (
        <main
			className={`flex min-h-screen flex-col justify-center items-center py-10 sm:px-[10vw] px-5 ${inter.className} overflow-x-hidden`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev" />

            <div className="prose prose-lg max-w-none">
                <h1>{postData.postData.title}</h1>
                <div className='w-full' dangerouslySetInnerHTML={{ __html: postData.postData.contentHtml }} />
            </div>

        </main>
    )
}