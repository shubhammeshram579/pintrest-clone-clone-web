import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';
import {Contenier} from "../../index.js"
import { useParams  ,useLocation} from 'react-router-dom';
import "..//..//../Responsive.css"


const SavePosts = () => {
  const { userId } = useParams();
  const location = useLocation();
  const [savePost ,setSavePost] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // url location selection 
  const isUserProfileRoute = location.pathname.includes('/getPostByUserPorofile/');
    
  const accessToken = useSelector((state)=>state.auth.user?.accessToken)

  // fatch get user  savepost api 
  useEffect(()=>{
    const fatchSavePost = async () => {
      try {
        const userSavePost = await axios.get(`https://printrest-clone-api.onrender.com/api/users/savePosts/${userId}`,{
          headers: {
            "Authorization":`Bearer ${accessToken}`
          }
        });
        console.log("usersavepost",userSavePost.data.data)
        setSavePost(userSavePost.data.data)
        setLoading(false);
        
      } catch (error) {
        setError(error.message);
          setLoading(false);
        
      }
  
    };
    fatchSavePost();
  
    },[]);

    if (loading) return <div className='py-[90vh]'>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
  return (
    // <Contenier>
    <div id='createdPost'>
       
         <ul className='flex justify-center items-center gap-10 flex-row pt-14 flex-wrap'>
        {savePost.map(post => (
          <li key={post._id} id='ownpostcard'>

            {/* set condition for url  */}
            <Link to={isUserProfileRoute ? `/getPostByID3/${post._id}`:`/getPostByID/${post._id}`}>
            {post.postImg && <img className='h-[300px] w-[400px] rounded-xl object-cover' src={post.postImg} alt={post.title} />}</Link>
            <h2 className='text-center font-bold mt-5'>{post.title}</h2>
            <p className='text-center'>{post.description}</p>
            <div className='flex items-center justify-around'>
            </div>
          </li>
        ))}
      </ul>

 
      
    </div>
    // {/* </Contenier> */}
  )
}

export default SavePosts