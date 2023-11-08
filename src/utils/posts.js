import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join('blogPosts');
const policyDirectory = path.join('policies');

export async function getPostData(id) {

    let fullPath;

    if (id == 'privacy' || id == 'terms' || id == 'cookies' || id == 'content' || id == 'community') {
        fullPath = path.join(policyDirectory, `${id}.md`);
    } else {
        fullPath = path.join(postsDirectory, `${id}.md`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    // Combine the data with the id and contentHtml
    // also return the original markdown
    return {
        id,
        markdown: matterResult.content,
        contentHtml,
        ...matterResult.data,
    };
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // remove any posts with published: false
  const publishedPosts = allPostsData.filter((post) => {
    return post.published === true;
  });

  // Sort posts by date
  return publishedPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
  