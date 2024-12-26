import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';


// Create Context
export const NotificationContext = createContext();




// Context Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
 

  const accessToken = useSelector((state) => state.auth.user?.accessToken)


  // fatch new post notification api and used socked io.
  useEffect(() => {
    const socket = io("http://localhost:3000");
    // console.log(socket)

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Notification', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log("post notifaction",response.data.data.notification)
        setNotifications(response.data.data.notification);
        setNotificationCount(response.data.data.notification.length);
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch notifications', error);
        setLoading(false);
      }
    };

    fetchNotifications();

    // Listen for notification deletion in real-time
    socket.on('notificationDeleted', (deletedNotificationId) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n._id !== deletedNotificationId)
      );
      setNotificationCount((prevCount) => prevCount - 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken]);


  // haadling new Notification post then open the delete
  const handleNotificationClick = async (notificationId, postId, navigate) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n._id !== notificationId)
    );
    setNotificationCount((prevCount) => prevCount - 1);

    try {
      await axios.delete(`http://localhost:3000/api/Notification/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const socket = io("http://localhost:3000");
      socket.emit('deleteNotification', notificationId);
    } catch (error) {
      console.log('Failed to delete notification', error);
    }

    navigate(`/getPostByID2/${postId}`);
  };

  // notification provider
  return (
    <NotificationContext.Provider value={{ notifications, loading, notificationCount, handleNotificationClick }}>
      {children}
    </NotificationContext.Provider>
  );
};
