import { getRecentPost, getRecentPosts, getSimilarPosts } from "@/services";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PostWidget = ({ categories, slug }) => {
  const [relatedPost, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl  mb-8 font-semibold border-b pb-4">
          {slug ? "Related Posts" : "Recent Posts"}
        </h3>
        {relatedPost.map((post) => (
          <div key={post.title} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <Image
                alt={post.title}
                height={60}
                width={60}
                className="align-middle rounded-full"
                src={post.featuredImage.url}
              />
            </div>
            <div>
        
             <Link className="text-sm" href={`/post/${post.slug}`} key={post.title}>
              {post.title}
             </Link>
             <p className="text-gray-500 font-xs text-sm">
              {moment(post.createdAt).format('MMM DD, YYYY')}
             </p>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostWidget;
