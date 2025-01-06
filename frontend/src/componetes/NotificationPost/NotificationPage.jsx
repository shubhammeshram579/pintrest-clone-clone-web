import React, {useState ,useEffect, createContext,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { NotificationContext } from './NotificationContext.jsx';
import { useSelector } from 'react-redux';
import "..//../Responsive.css"



const Notification = ({setShowNotifications,showNotifications})  => {

  const { notifications, loading, handleNotificationClick } = useContext(NotificationContext);
  const navigate = useNavigate()

  const [visible , setVisible] = useState(false)
  const authStatus = useSelector((state) => state.auth.isLoggedIn);


console.log(notifications);
  // animation effect
  useEffect(() => {
    // Delay the visibility state change to trigger smooth transition
    setTimeout(() => {
        setVisible(true);
    }, 100); // Delay for smooth transition
}, []);


// notificaion page hide hendeler
  const noficationpagehid = () =>{
    setShowNotifications(!showNotifications)
  }

  if(loading) return <div>Loading...</div>
  

  return (
    <>
    {authStatus ? (
    <div id='Notification' className={`Notification w-[22vw] h-[80vh] rounded-xl bg-gray-200 fixed z-50 px-5 ${visible ? "visible" : ""}`}>
    <div id='Noticationcard' className='flex items-start justify-center  flex-col gap-2' >
      <h1 className='px-2 py-2 font-semibold text-xl'>notification: {notifications.length} </h1>
      <h1 className='font-bold ml-2 mb-5 text-xl'>Updates</h1>
      {notifications.length === 0 ? (
        <p className='px-2'>No notifications</p> 
      ):(
        <ul id='notificationCard2' className='flex items-center justify-between flex-col gap-2 overflow-y-auto overflow-hidden h-[calc(70vh-100px)]'>
      {notifications.map((n)=> (
        <div id='notificationCard3' className='h-full w-full bg-gray-300 rounded-lg pb-2 mr-1' onClick={() => {handleNotificationClick(n._id, n.postId._id ,navigate); noficationpagehid();}}>
         <h1 className='font-bold ml-2'>New</h1>
        <div className='flex items-center justify-evenly mb-2 gap-4'>
            <img src={n.postId.postImg} alt={n.postId.title} className='h-16 w-24 rounded-lg ml-2'/>
            <h1>{n.postId.description}</h1>
            <p>{n.createdAt.substring(0,10)}</p>
        </div>
    </div>
      ))}
        </ul>
    )}  
        
    </div>
    </div>
    
  ) : (null)}
  </>
  )
}

export default Notification

