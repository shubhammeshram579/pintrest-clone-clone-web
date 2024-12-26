import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const SharePost = ({ postUrl, postTitle }) => {
  const [visible, setVisible] = useState(false);

  // copy current post url
  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl).then(
      () => alert("Link copied to clipboard!"),
      (err) => alert("Failed to copy the link")
    );
  };

  return (
    <div className="w-10 h-10">
      <i
        className="ri-share-2-line cursor-pointer text-[25px] text-black rounded-full px-2 py-1"
        onClick={() => setVisible(!visible)}
      ></i>
      <div
        className={`transition-opacity duration-500 relative z-10 ${
          visible ? "inline-block" : "hidden"
        }`}
      >
        {/* copy to post url for share the link */}
        <div className="bg-white rounded-lg px-2 mt-2 p-10 text-black">
          <h3 className="text-xl text-center mb-5">Share</h3>
          <div className="flex justify-center items-center gap-10">
            <FacebookShareButton url={postUrl} quote={postTitle}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={postUrl} title={postTitle}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton url={postUrl} title={postTitle}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <button onClick={copyToClipboard} className="text-xl text-black">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePost;
