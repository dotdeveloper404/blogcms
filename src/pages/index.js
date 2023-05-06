import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import { PostCard, Categories, PostWidget } from "./components/";
import {FeaturedPosts} from "../sections/"
import { getPosts } from "@/services";

const inter = Inter({ subsets: ["latin"] });

// const posts = [
//   {
//     titile: "React Testing",
//     excerpt: "Learn React Testing",
//   },
//   {
//     titile: "React Testing",
//     excerpt: "Learn React Testing",
//   },
// ];

export default function Home({posts}) {
  console.log(posts)
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog CMS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts/>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts?.map((post) => (
            <PostCard key={post.title} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories  />
          </div>
        </div>
      </div>
    </div>
  );
}

//get api data
export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { posts },
  };
}
