import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const OptionsCard = ({ onDownload, onHide, visible, postId }) => {
  // const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.user?.accessToken);

  // get post
  useEffect(() => {
    const fatchgetpost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/getPostByID/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setPost(response.data.data.getPostbyId);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fatchgetpost();
  }, [postId, accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <div
      className={`transition-opacity duration-500 z-20 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-[100px] w-[200px] flex items-center justify-center flex-col bg-white shadow-md rounded-lg absolute z-20 font-semibold">
        <a
          href={post.postImg}
          target="target"
          className="py-2 px-5 rounded-3xl flex items-center justify-center text-gray-700 hover:bg-gray-200"
        >
          Download post Image
        </a>
        <button
          onClick={onHide}
          className="py-2 px-5 rounded-3xl text-left text-[15px] text-gray-700 hover:bg-gray-200"
        >
          Hide Post Image
        </button>
      </div>
    </div>
  );
};

export default OptionsCard;
