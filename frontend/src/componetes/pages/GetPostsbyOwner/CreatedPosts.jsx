import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Contenier } from "..//../index.js";
import { useParams,useLocation } from "react-router-dom";
import "..//..//../Responsive.css"

const CreatedPosts = () => {
  const {userId} = useParams()
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


   // url location selection 
   const isUserProfileRoute = location.pathname.includes('/getPostByUserPorofile/');

  const accessToken = useSelector((state) => state.auth.user?.accessToken);


  //fatch get post Api
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://printrest-clone-api.onrender.com/api/posts/getPost/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log(response.data.data.getPost)
        setPosts(response.data.data.getPost);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
   
  }, []);

  if (loading) return <div className="h-[100vh]">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    //  <Contenier>
    <div id="createdPost" className="py-[50px] flex flex-wrap items-center justify-center">
      {/* <h1>Posts by Owner {posts.length}</h1> */}
     
        <ul className="flex items-center gap-10 justify-center flex-row flex-wrap">
          {posts.map((post) => (
            <li key={post._id} id="ownpostcard">

              {/* set condition for url */}
              <Link to={isUserProfileRoute ? `/getPostByID3/${post._id}`:`/getPostByID/${post._id}`}>
                {post.postImg && (
                  <img
                    className="h-[300px] w-[400px] rounded-xl object-cover"
                    src={post.postImg}
                    alt={post.title}
                  />
                )}
              </Link>
              <h2 className="text-center font-bold mt-5">{post.title}</h2>
              <p className="text-center">{post.description}</p>
              <div className="flex items-center justify-around"></div>
            </li>
          ))}
        </ul>
    
    </div>
    // </Contenier>
  );
};

export default CreatedPosts;
