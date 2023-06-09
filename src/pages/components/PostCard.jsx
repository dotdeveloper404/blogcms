import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
const PostCard = ({ post }) => {
  console.log(post);
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md pb-80 mb-6">
          <Image
            src={post.featuredImage?.url}
            alt={post.title}
            width={0}
            height={0}
            sizes="100vw"
            className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded:lg"
          />
        </div>
        <h1
          className="transition duration-700 text-center mb-8 cursor:pointer
        hover:text-pink-600 text-3xl font-semibold"
        >
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>
        <div className="block lg:flex text-center item-center justify-center mb-8  w-full ">
          <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <Image
              alt={post.author.name}
              height={30}
              width={30}
              className="align-middle rounded-full"
              src={post.author?.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="text-medium text-gray-700">
                    <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>
        <p className="transition duration-500 transform hover:translate-x-1 text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">{post.excerpt}</p>
  
        <div className="text-center">
        <Link href={`/post/${post.slug}`}>
            <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                Continue Reading
            </span>
        </Link>
      </div>

      </div>
  
    </>
  );
};

export default PostCard;
