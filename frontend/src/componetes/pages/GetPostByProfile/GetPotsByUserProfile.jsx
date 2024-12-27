import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Contenier, SharePost } from "..//../index.js";
import FollowButton from "..//../FollowBtn.jsx";
import CreatedPosts from "../GetPostsbyOwner/CreatedPosts.jsx";
import SavePosts from "../GetPostsbyOwner/SavePosts.jsx";
import "..//..//../App.css"

const GetPotsByUserProfile = () => {
  const { userId } = useParams();
  const [getUser, setGetUser] = useState([]);
  const [visible ,setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("created");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const accessToken = useSelector((state) => state.auth.user?.accessToken);
  const targetId = useSelector((state) => state.auth.user?.user._id);



  // annimation effect
  useEffect(() => {
    setTimeout(()=>{
      setVisible(true)
    },500)

  },[])


  // fatch posts by userProfile
  useEffect(() => {
    const fatchGetUser = async () => {
      try {
        const response = await axios.get(
          `https://pintrest-clone-o5vo6u2w8-shubham-meshrams-projects-cfc33b49.vercel.app/api/users/getUsersById?_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.data.postUser);
        setGetUser(response.data.data.postUser);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fatchGetUser();
  }, []);


  const postUrl = window.location.href;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!getUser || !getUser.fullname){
    return <div>Loading...</div>;
  } 

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
 
   
       
    <div className="pt-40 bg-slate-100 w-full h-full ">
        <div className={`Ownerpage flex items-center justify-center flex-col ${visible ? "visible" : ""}`}>
          <h1 className="w-10 h-10 p-16 rounded-full bg-gray-400 flex items-center justify-center font-bold text-xl mb-5">
            {getUser.fullname?.[0]}
          </h1>
          <h1 className="font-bold text-4xl mb-2">{getUser.fullname}</h1>
          <h2>@ {getUser.username}</h2>
          <div className="flex items-center justify-between gap-5 font-bold">
            <h2 className="mt-2">{getUser.followers.length} Followers</h2>
            <h2 className="mt-2">{getUser.following.length} Follwing</h2>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <h1 className="px-10 flex items-center justify-center py-1 rounded-3xl bg-slate-400 hover:bg-green-500">
              <SharePost postUrl={postUrl} />
              Share
            </h1>
            <div className=" bg-red-500 px-10 rounded-3xl">
              <FollowButton userId={targetId} targetUserId={userId} />
            </div>
          </div>
          <div>
            <div className="button-group flex items-center justify-center gap-5 font-bold mt-[150px]">
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

            <div className="content">
              {activeSection === "created" && (
                <div className="created-posts mt-10">
                  <CreatedPosts />
                </div>
              )}

              {activeSection === "saved" && (
                <div className="saved-posts mt-5">
                  <SavePosts />
                </div>
              )}
            </div>
          </div>
        </div>
 
  
    
      </div>
      
     
  
  );
};

export default GetPotsByUserProfile;





