// pages/SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "..//..//../App.css";
import "..//..//../Responsive.css"

import {
  SharePost,
  SavePostButton,
  OptionsCard,
} from "../../index.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const SearchResults = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [visible, setVisible] = useState(false);
  const query = useQuery().get("query");
  const accessToken = useSelector((state) => state.auth.user?.accessToken);
  const user = useSelector((state) => state.auth.user?.user);


  // fatch search post Api
  useEffect(() => {
    if (query) {
      axios
        .get(`/api/posts/getAllpost/search`, {
          params: { query },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setPosts(response.data.data.getPost);
        })
        .catch((error) => {
          console.log("Error fetching search results:", error);
        });
    }
  }, [query]);

   //post image hide
   const handleHide = () => {
    setIsHidden(!isHidden);
  };


   // Function to randomly decide if a margin should be applied
   const shouldApplyMargin = () => Math.random() < 0.5; // 50% chance to apply margin

  return (
    
      <div id="HomePostCard" className="w-full h-full relative z-40 pt-32 bg-slate-100 flex items-center justify-between flex-col">
        <ul id="homePost" className="flex flex-row items-center justify-between flex-wrap gap-5 pb-24  px-20">
          {posts.map((post, index) => {
            // Use a random function to decide margin for every other card
            const randomMargin = index % 2 !== 0 ? "70px" : "0px"; // Stagger every second post card with a margin of 30px

            return (
              <li
                key={post._id}
                className="card relative mb-[-55px] rounded-2xl"
                style={{ marginTop: randomMargin }} // Apply staggered top margin
                onMouseEnter={() => setHoveredIndex(index)} // Set hover state on mouse enter
                onMouseLeave={() => setHoveredIndex(null)} // Reset hover state on mouse leave
                id="postCard"
              >
                <Link
                  to={`/getPostByID2/${post._id}`}
                  className="relative group"
                >
                  <img
                    className={`cardImg  w-[14vw] h-[50vh] object-cover object-center transition duration-300 rounded-3xl ${
                      hoveredIndex === index ? "opacity-50" : "opacity-100"
                    }`}
                    src={post.postImg}
                    alt="image"
                  />
                  {/* Overlay for light dark effect on hover */}
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black opacity-45 rounded-3xl transition-opacity duration-300"></div>
                  )}
                </Link>

                {/* Save button with conditional opacity */}
                <h1
                id="SavebtnId"
                  className={`SaveBtn absolute ml-[150px] mt-[-450px] mb-[500px] py-1 px-4 bg-red-500 rounded-3xl transition-opacity duration-300 text-white ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <SavePostButton userId={user._id} postId={post._id} />
                </h1>

                {/* Icons with conditional opacity */}
                <div
                  className={`selectbtn flex items-center justify-between absolute mt-[-80px] pl-4 mb-14 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                    // index % 2 !== 0 ? 'mt-[-70px]' : ''
                  }`}
                  id="btnsitems"
                >
                  <i id="webLink" class="ri-arrow-right-up-line bg-white flex items-center justify-center px-6 py-[8px] rounded-3xl gap-2 text-lg">
                    {" "}
                    behance
                  </i>
                  <div className="flex items-center justify-center gap-4 ml-[20px]">
                    <div className="bg-white rounded-full mt-1">
                      <SharePost postUrl={post._id} postTitle={post.title} />
                    </div>

                    <i
                      className="fa-solid fa-ellipsis cursor-pointer mr-5 text-2xl bg-white px-2 py-[3px] mt-[5px] rounded-full"
                      onClick={() => setVisible(!visible)}
                    ></i>
                    <OptionsCard
                      onHide={handleHide}
                      visible={visible}
                      postId={post._id}
                    />
                  </div>
                </div>

                <h2 id="text1" className="text-center mt-5 font-bold">{post.title}</h2>
                <p id="text1" className="text-center">{post.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
  );
};

export default SearchResults;



