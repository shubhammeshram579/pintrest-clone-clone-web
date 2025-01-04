import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input, SharePost, SavePostButton,Contenier ,OptionsCard,FollowBtn} from "../../index.js";
import "..//..//../App.css"
import "..//..//../Responsive.css"


const GetPostsByotherUser = () => {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [visible1, setVisible1] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const accessToken = useSelector((state) => state.auth.user?.accessToken);

  // donload butten and hide butten
  const [visible, setVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);


   // Annimation effect
   useEffect(() => {
    // Delay the visibility state change to trigger smooth transition
    setTimeout(() => {
      setVisible1(true);
    }, 500); // Delay for smooth transition
  }, []);



  // fatch get post APi
  useEffect(() => {
    const fatchgetpost = async () => {
      try {
        const response = await axios.get(
          `https://printrest-clone-api.onrender.com/api/posts/getPostByID/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log("getPost",response.data.data.getPostbyId)
        setPost(response.data.data.getPostbyId);
        // setUserId(response.data.data.getPostbyId.owner)
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fatchgetpost();
  }, [postId, accessToken]);



  // fatch get current user Api
  useEffect(() => {
    const fatchCurrentUser = async () => {
      try {
        const currentUser = await axios.get(
          "https://printrest-clone-api.onrender.com/api/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // console.log("currentUser", currentUser.data.data.curentUser);
        setCurrentUser(currentUser.data.data.curentUser);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fatchCurrentUser();
  }, []);

  // fatch get comment api
  useEffect(() => {
    const fatchgetComment = async () => {
      try {
        const resComment = await axios.get(
          `https://printrest-clone-api.onrender.com/api/comments/getcomment/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log("comment", resComment.data.data.getcomment);
        setComment(resComment.data.data.comments);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fatchgetComment();
  }, [postId, accessToken]);

  // postUrl copy
  const postUrl = window.location.href;



  
  // send comment post Api
  const onSubmit = async (data) => {
    try {
      const addcomment = await axios.post(
        `https://printrest-clone-api.onrender.com/api/comments/addcomment/${postId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert(addcomment.data.message);
      // console.log(addcomment);
      reset();
      return addcomment.data;
    } catch (error) {
      console.log(error);
      alert("Error registration ");
    }
  };

  if (loading) return <div className="min-h-[100vh]">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post || !post.owner || !post.owner.fullname || !currentUser.fullname) {
    return <div className="min-h-[100vh]">Loading...</div>;
  }

  //post image hide
  const handleHide = () => {
    setIsHidden(!isHidden);
  };

 

  return (
    <div id="PostbyId"  className={` mt-14 w-full min-h-[100vh] flex items-center justify-center flex-col `}>
      <div className="font-bold text-[25px] flex items-center justify-between w-full px-20">
        <Link to={`/getPostByUserPorofile/${post.owner._id}`} id="ArrowBtn">
          <i class="ri-arrow-left-fill"></i>
        </Link>
        <div>
        <h1></h1>
        </div>
      </div>
      {/* <Contenier> */}
      <div id="PostCard" className={`CreatePost bg-slate-200 w-[39vw] flex items-center rounded-xl ${visible1 ? "visible1" : ""}`}>
        <div className="py-5 flex items-start justify-start">
          <div
            className={`transition-colors duration-500 rounded-lg ${
              isHidden ? "bg-gray-200" : ""
            }`}
          >
            {post.postImg && (
              <img
                className={`h-[72vh] w-[18vw] rounded-xl object-cover ml-2 ${
                  isHidden ? "opacity-0" : "opacity-100"
                }`}
                src={post.postImg}
                alt={post.title}
              />
            )}
          </div>

          {/* share post and download image */}
          <div id="postItems" className="flex items-center flex-col">
            <div className="flex items-center justify-between w-full pl-4">
              <div className="flex items-center justify-center gap-4 ">
                <SharePost postUrl={postUrl} postTitle={post.title} />
                <i
                  className="fa-solid fa-ellipsis cursor-pointer text-[30px]"
                  onClick={() => setVisible(!visible)}
                ></i>
                <OptionsCard
                  onHide={handleHide}
                  visible={visible}
                  postId={postId}
                />
              </div>

              {/* profile and save post card */}
              <div className="flex gap-4 text-[25px] items-center">
                <h5 id="ProfileText">
                  Profile <i class="fa-solid fa-chevron-down"></i>
                </h5>
                <SavePostButton userId={currentUser._id} postId={postId} />
              </div>
            </div>

            {/* post titel and description */}
            <div id="Title" className="flex items-start justify-start flex-col w-full pl-5">
              <h1 className="font-bold text-[40px] mt-[100px]">{post.title}</h1>
              <p className="mt-3 pb-20">{post.description}</p>
            </div>

            <div className="w-full pl-5 flex items-center justify-between">
              <div className="flex items-center justify-center gap-3">
                <h1 className="rounded-full bg-gray-400 px-5 py-3">
                  {post.owner.fullname[0]}
                </h1>
                <h1 className="flex flex-col">
                  <Link
                    to={
                      post.owner._id === currentUser._id
                        ? `/getPost/${currentUser._id}`
                        : `/getPostByUserPorofile/${post.owner._id}`
                    }
                  >
                    {post.owner.fullname}{" "}
                  </Link>
                  <span>{post.owner.followers.length} followers</span>
                </h1>
              </div>
              <div>
                <FollowBtn
                  userId={currentUser._id}
                  targetUserId={post.owner}
                />
              </div>
            </div>

            {/* get comment */}
            <div id="CommentCard" className="mt-10 w-full pl-5 overflow-y-auto h-[calc(15vh-10px)]">
              <h1 className="font-bold text-2xl mb-2">
                Comment : {comment.length}
              </h1>
              {comment.map((c) => (
                <div
                  key={c._id}
                  className="flex items-start justify-start gap-2"
                >
                  <h1 className="font-semibold text-lg">{c.owner.fullname}</h1>
                  <p>{c.content} !</p>
                </div>
              ))}
            </div>

            {/* create comment */}
            <div className="mt-10 w-full pl-5">
              <h1 className="font-bold text-[25px]">What do you think?</h1>
              <div className="flex items-center gap-3 mt-4">
                <h1 className="bg-gray-400 py-4  px-6 rounded-full">
                  {currentUser.fullname[0]}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-yellow-700 text-[30px] bg-white rounded-e-lg py-[9.5px] px-4 flex items-center justify-around">
                    <Input
                      placeholder="Add a comment"
                      className="text-lg rounded-s-sm"
                      {...register("content", {
                        required: "'content is required",
                      })}
                    />
                    <i class="fa-regular fa-face-smile"></i>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Contenier> */}
    </div>
  );
};

export default GetPostsByotherUser;
