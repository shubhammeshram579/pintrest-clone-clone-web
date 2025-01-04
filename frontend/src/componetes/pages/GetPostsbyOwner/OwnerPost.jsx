import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import { Contenier, SharePost, Footer } from "..//../index.js";
import CreatedPosts from "./CreatedPosts.jsx";
import SavePosts from "./SavePosts.jsx";
import "..//..//../App.css";



const OwnerPost = () => {
  const scrollRef2 = useRef(null);
  const scrollInstance = useRef(null); // Keep track of Locomotive Scroll instance
  const [currentUser, setCurrentUser] = useState([]);
  const [activeSection, setActiveSection] = useState("created");
  const [visible, setVisible] = useState(false);
  const accessToken = useSelector((state) => state.auth.user?.accessToken);
  const [loading, setLoading] = useState(true);
  const postUrl = window.location.href;




   // Animation effect
   useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);

  // Fetch current user Api
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await axios.get(
          "https://printrest-clone-api.onrender.com/api/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCurrentUser(userData.data.data.curentUser);
        setLoading(false);

        // Refresh Locomotive Scroll after content loads
        if (scrollInstance.current) {
          scrollInstance.current.update();
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [accessToken]);


  // handel savepost and create post section
  const handleSectionChange = (section) => {
    setActiveSection(section);

    // Update Locomotive Scroll when section changes
    if (scrollInstance.current) {
      setTimeout(() => {
        scrollInstance.current.update();
      }, 200); // Add a slight delay to ensure content has rendered
    }
  };


  
  // Initialize Locomotive Scroll
  useEffect(() => {
    if (scrollRef2.current) {
      scrollInstance.current = new LocomotiveScroll({
        el: scrollRef2.current,
        smooth: true,
        smoothMobile: true, // Enable smooth scrolling on mobile
        inertia: 1, // Inertia-based smooth scrolling
        getDirection: true, // Track scroll direction
        getSpeed: true, // Track scroll speed
        // multiplier: 1.5, // Scroll speed multiplier
      });

      // Clean up Locomotive Scroll on component unmount
      return () => {
        if (scrollInstance.current) {
          scrollInstance.current.destroy();
        }
      };
    }
  }, []);


  if (loading) return <div className="py-[100vh]">Loading...</div>;
  if (!currentUser.fullname) {
    return <div className="py-[100vh]">Loading...</div>;
  }

  return (
    
    <div
      className={`w-full h-full  bg-slate-100 relative z-30 scroll-smooth`}
      // ref={scrollRef2}
      // data-scroll
    >
      <div
        className={`Ownerpage pt-40 flex items-center justify-center flex-col ${
          visible ? "visible" : ""
        } `}
        ref={scrollRef2}
      >
        <h1 className="w-10 h-10 p-16 rounded-full bg-gray-400 flex items-center justify-center font-bold text-xl mb-5">
          {currentUser.fullname[0]}
        </h1>
        <h1 className="font-bold text-4xl mb-2">{currentUser.fullname}</h1>
        <h2>@{currentUser.username}</h2>
        <div className="flex items-center justify-between gap-5 font-bold">
          <h2 className="mt-2">{currentUser.followers.length} Followers</h2>
          <h2 className="mt-2">{currentUser.following.length} Following</h2>
        </div>
        <div className="flex items-center justify-center gap-3 mt-5">
          <h1 className="px-10 flex items-center justify-center py-1 rounded-3xl bg-gray-400 hover:bg-green-500">
            <SharePost postUrl={postUrl} />
            Share
          </h1>
          <Link to="/UpdateUser">
            <h1 className="rounded-3xl py-3 px-10 bg-gray-400 hover:bg-red-500 hover:text-white">
              Edit profile
            </h1>
          </Link>
        </div>

        <div className="button-group flex items-center justify-center gap-5 font-bold pt-10">
          <button
            onClick={() => handleSectionChange("created")}
            className={
              activeSection === "created"
                ? "border-b-4 border-blue-500"
                : "border-b-4 border-transparent"
            }
          >
            Created
          </button>
          <button
            onClick={() => handleSectionChange("saved")}
            className={
              activeSection === "saved"
                ? "border-b-4 border-blue-500"
                : "border-b-2 border-transparent"
            }
          >
            Saved
          </button>
        </div>
        <div className="h-full pt-10">
          {activeSection === "created" && (
            <div className="created-posts">
              <CreatedPosts />
            </div>
          )}

          {activeSection === "saved" && (
            <div className="saved-posts">
              <SavePosts />
            </div>
          )}
        </div>
      </div>
  
    </div>
   
  );
};

export default OwnerPost;
