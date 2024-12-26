import React, { useState, useEffect,useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CurrentDateTime from "./CurrentDate.jsx";
import "..//../App.css";
import "..//../Responsive.css"

// import date format date-fns
import { format, formatDistanceToNow, isToday } from "date-fns";


// Socket.IO is an event-driven library for real-time web applications. 
import io from "socket.io-client";

const socket = io("https://pintrest-clone-api.vercel.app");


const ChatMessageBox = () => {
  const { from, to } = useParams();
  const { handleSubmit, register, reset } = useForm();
  const [chats, setChats] = useState([]);
  const [visible ,setVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState([]);
  const latestMessageRef = useRef(null); // Ref to track the latest message


  // error heandling 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // useNavigate is a hook that allows you to programmatically navigate between different routes or URLs within your application.
  const navigate = useNavigate()
  const currentPath = window.location.pathname;

  // current user accessToken
  const accessToken = useSelector((state) => state.auth.user?.accessToken);
  



  // Animation set time
  useEffect(()=>{
    setTimeout(()=>{
      setVisible(true)

    },100)
  })


// fatch current user Api
  useEffect(() => {
    const fatchcurrentUser = async () => {
      try {
        const getcurrentUser = await axios.get(
          `https://pintrest-clone-api.vercel.app/api/users/current-user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setCurrentUser(getcurrentUser.data.data.curentUser);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };
    fatchcurrentUser();
  }, [accessToken]);



  





  // fatch messages chats 
  useEffect(() => {
    const fatchChats = async () => {
      try {
        const response = await axios.get(
          `https://pintrest-clone-api.vercel.app/api/chatMessage/${from}/${to}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("gett chats", response.data.data.chatMessages);
        setChats(response.data.data.chatMessages);
        // socket.emit("sendMessage", response.data.data.chatMessages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
        setLoading(false);
      }
    };
    fatchChats();
  }, [from, to, accessToken]);



  

  // get real time other user chat using socket io.
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChats((prevChats) => [...prevChats, data]);
      scrollToLatestMessage();
    });

    return () => socket.off("receiveMessage");
  }, []);



  // send messages post Api
  const onSubmit = async (data) => {
    try {
      const newMessage = {
        from: from,
        to: to,
        message: data.message.trim(),
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      // send message Api
      await axios.post(
        `https://pintrest-clone-api.vercel.app/api/chatMessage/send`,
        newMessage,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );


      // set real time chet messages using socket io.
      socket.emit("sendMessage", newMessage);
      scrollToLatestMessage();

      // reset inpute 
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };


  


  // smooth chat scroling 
  const scrollToLatestMessage = () => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };




  // read chats and update chat api
  useEffect(()=>{
     // Mark the message as read
     const readchats = async () =>{
     try {
      await axios.put(`https://pintrest-clone-api.vercel.app/api/chatMessage/readchat/${from}/${to}`,{
      },{
        headers:{
          "Authorization":`Bearer ${accessToken}`
        }
      });

      setChats((prevChats) =>
        prevChats.map(chat =>
          chat.from === currentUser._id && chat.to === to ? { ...chat, isRead: true } : chat
        )
      );

      console.log("read succefully")
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }

  };
  readchats()
},[from,to]);




  

  // time data format change
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  // refress chatbox page
  const handleRefresh = () => {
    navigate('/'); // Redirect to another page temporarily
    setTimeout(() => {
      navigate(`/otherUser/${from}/${to}`); // Navigate back to the current page after a brief delay
    }, 0);
  };

  // heandling error   
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;




  return (
    <div id="chatBox" className={`Chatbox w-[23vw] h-[100vh] bg-gray-200 rounded-xl overflow-hidden fixed z-50 mt-28 ml-[73%]  ${visible ? "visible" : ""}`}>
      <nav className="chatboxheader flex items-center justify-around font-semibold text-2xl pt-5 ">
        <Link to="/message">
          <i className="fa-solid fa-angle-left"></i>
        </Link>
        <h1 className="bg-green-600 py-2 px-5 rounded-full">
          {currentUser.fullname[0]}
        </h1>
        <h1>{currentUser.fullname}</h1>
        <i className="fa-solid fa-ellipsis"></i>
      </nav>


      <div id="chatMessagebox" className="bodyData mt-[7px] overflow-y-auto h-[calc(78vh-100px)]">
        <div>
          <div>
            {/* curentUser info */}
            <div className="flex flex-col items-center justify-center">
              <div className="mt-10">
                <i className="fa-solid fa-hands-clapping ml-48 text-yellow-600 py-2 px-3 text-xl bg-gray-300 rounded-full"></i>
                <h1 className="py-14 px-16 rounded-full bg-gray-400 ml-28 mt-[-20px]">
                  {currentUser.fullname[0]}{" "}
                </h1>
              </div>
              <div>
                <i className="ri-message-3-fill bg-gray-300 py-2 px-3 rounded-lg"></i>
                <h1 className="py-14 px-16 rounded-full bg-green-400 mr-32 mt-[-38px] ">
                  {currentUser.fullname[0]}
                </h1>
              </div>
            </div>
            <div className="text-center mt-10 mb-10">
              <h1 className="font-semibold text-xl">{currentUser.fullname}</h1>
              <h1>This could be the beginning of something good</h1>
            </div>
          </div>
        </div>
        <div className="border-t-[3px]">
          <h1 className="text-center">
            <CurrentDateTime />
          </h1>
        </div>

        {/* chat page  */}
        <div className="flex items-start justify-between px-5 mt-5 mb-10">
          <h1>Other</h1>
          <h1>You</h1>
        </div>
        <div>

          {/* get chats */}
          <div className="px-5">
            {chats.map((chat,index) => (
              <div
                key={chat._id} 
                ref={chat._id === chats.length - 1 ? latestMessageRef : null}
                className={`flex ${
                  chat.to !== currentUser._id ? "justify-end" : "justify-start"
                }`}
                
              >
                <div
                  className={`bg-gray-300 rounded-lg px-4 py-2 mt-7 max-w-xs ${
                    chat.to !== currentUser._id ? "text-right" : "text-left"
                  }`}
                >
                  <div className="font-normal text-sm text-gray-700">
                    {chat.to !== currentUser._id ? "" : chat.from.fullname}
                  </div>
                  <div className="font-semibold text-black flex items-center justify-between gap-2">
                    {chat.message}

                    {/* date and time formate */}
                    <div className="text-xs text-gray-500 mt-1">
                      {
                        isToday(new Date(chat.createdAt))
                          ? format(new Date(chat.createdAt), "hh:mm a") // Show time if the message is from today
                          : formatDistanceToNow(new Date(chat.createdAt), {
                              addSuffix: true,
                            }) // Show relative time if the message is from a previous day
                      }
                      
                      {chat.isRead && <span>✔</span>} {/* Show double checkmark if read */}
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
        <h1 className="text-end pr-3 pb-5 mt-14">Seen</h1>
      </div>


      {/* chatbox page footer */}
      <footer id="chatFoter" className="footerbox flex items-center justify-evenly mt-10 w-[22vw] bg-gray-200 z-50">
        <i className="fa-solid fa-circle-plus text-4xl"></i>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Type a message"
            id="SendChatMessage"
            className="w-[13vw] h-16 rounded-full"
            {...register("message", { required: true })}
          />
          <Link to={`/otherUser/${from}/${to}`}>
            <i
              className="fa-solid fa-arrow-up-long bg-gray-500 py-4 px-6 ml-2 rounded-full"
              onClick={handleSubmit(onSubmit)}
            ></i>
           
          </Link>
        </form>
        <button onClick={handleRefresh}>refp</button>
      </footer>
    </div>
  );
};

export default ChatMessageBox;

