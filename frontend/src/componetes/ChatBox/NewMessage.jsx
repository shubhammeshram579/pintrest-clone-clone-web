import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link} from "react-router-dom";
import "..//../App.css"



const NewMessage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [getAllUser, setGetAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser , setCurrentUser] = useState([])
  const [message, setMessage] = useState('');

  const [visible ,setVisible] = useState(false);


  // current user accessToken
  const accessToken = useSelector((state) => state.auth.user?.accessToken);
  


  // fatch currentUser Api 
  useEffect(()=>{
    const fatchcurrentUser = async () => {
      try {
        
        const getcurrentUser = await axios.get(`https://pintrest-clone-o5vo6u2w8-shubham-meshrams-projects-cfc33b49.vercel.app/api/users/current-user`,{
          headers:{
            "Authorization":`Bearer ${accessToken}`,
          }
        })

        console.log("getcurrentUser.data.data.curentUser",getcurrentUser.data.data.curentUser)
        setCurrentUser(getcurrentUser.data.data.curentUser)
      } catch (error) {
        console.error("Error fetching search results", error);
        
      }

    }
    fatchcurrentUser();
  },[accessToken])



  // search user Api
  const onSubmit = async (data) => {
    const query = data.query.trim();
    if (query) {
      try {
        const getUsers = await axios.get(
          `https://pintrest-clone-o5vo6u2w8-shubham-meshrams-projects-cfc33b49.vercel.app/api/users/getAllUsers/search`,
          {
            params: { query },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log(getUsers.data.data.getUsers)
        setGetAllUsers(getUsers.data.data.getUsers);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    }
  };



  // headling select user 
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };




// send message post Api
  const handleSendMessage = async () => {
    if (selectedUser && message.trim()) {
      try {
          await axios.post(`https://pintrest-clone-o5vo6u2w8-shubham-meshrams-projects-cfc33b49.vercel.app/api/chatMessage/send`, {
          from: currentUser._id,
          to: selectedUser._id,
          message: message.trim(),
          createdAt: new Date().toISOString(),

        },{ headers:{
          "Authorization":`Bearer ${accessToken}`,
        }});
        setMessage("");

      } catch (error) {
        console.log('Error sending message', error);
      }
    }
  };



// animation set time
  useEffect(()=>{
    setTimeout(()=>{
      setVisible(true)

    },100)
  })


  

 

  return (
    <div id="SendMassagepage" className={`NewMassage w-[22vw] h-[85vh] bg-gray-200 rounded-xl fixed z-50 mt-28 ml-[73%] ${visible? "visible":""}`}>
      <div className="flex items-center justify-between p-4 font-semibold text-2xl">
        <h1 className="text-xl">New Messages</h1>
        <Link to="/message"><button>
          <h1 className="text-xl">cancel</h1>
        </button></Link>
      </div>

      <div id="SendMassagepageItem" className="flex items-start justify-between gap-[45vh] flex-col px-5">
        {/* seearch users */}
        <div className="mt-10">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <i class="fa-solid fa-magnifying-glass bg-green-300 h-12 pt-4 pl-3 rounded-s-lg"></i>
              <input
                type="text"
                placeholder="search user"
                id="SearchUser"
                className="w-[18vw] h-12 rounded-e-lg bg-green-300"
                {...register("query")}
              />
              <button type="submit" className="hidden"></button>
             
            </form>
          </div>


          {/* select user */}
        <div className="mt-2">
        {getAllUser.length > 0 && (
          <ul className="mt-10">
            {getAllUser.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserSelect(user)}
                style={{
                  backgroundColor: selectedUser && selectedUser.id === user.id ? 'yellow' : 'transparent',
                  cursor: 'pointer',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <div className="flex items-center justify-start gap-5">
                <h1 className="bg-blue-400 py-3 px-5 rounded-full">{user.fullname[0]}</h1>
                <div>
                <h1 className="font-semibold">{user.fullname}</h1>
                <h1>{user.username}</h1>
                </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>


        {/* sendMessage */}
        {selectedUser && (
        <div id="sendmessageCard" className="flex items-center justify-center gap-2 mt-[-50px]">
          <i class="ri-tools-fill text-2xl"></i>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              id="SendMessagesInput"
              placeholder={`Send message to ${selectedUser.username}`}
              className="w-[15vw] h-16 rounded-full bg-green-300"
              // {...register('message', { required: true })}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          <Link to={`/otherUser/${currentUser._id}/${selectedUser._id}`}><i class="ri-send-plane-2-fill text-xl bg-red-600 p-4 rounded-full ml-1" onClick={handleSendMessage}></i></Link>
          </form>
        </div>
         )}
      </div>
    
    </div>
  );
};

export default NewMessage;



