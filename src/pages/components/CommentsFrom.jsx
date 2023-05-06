import { submitComment } from "@/services";
import React, { useEffect, useRef, useState } from "react";

const CommentsFrom = ({slug}) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  });

  const handleCommendSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };
    //
    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          name="comment"
          placeholder="Comment"
          className="text-gray-700 p-4 outline-none w-full  rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          ref={nameEl}
          type="text"
          className="text-gray-700 py-2 px-4 p-4 outline-none w-full  rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
          name="name"
          placeholder="Name"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          ref={emailEl}
          type="email"
          className="text-gray-700 py-2 px-4 p-4 outline-none w-full  rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
          name="email"
          placeholder="Email"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            value="true"
          />
          <label className="text-gray-500 cursor-pointer ml-3">
            Save my email and name for the next time i comment
          </label>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500">All fields are required*</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
          onClick={handleCommendSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3  text-green-500">
            Comment Submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsFrom;
