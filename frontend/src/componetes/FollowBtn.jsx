import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FollowButton = ({ userId, targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const accessToken = useSelector((state) => state.auth.user?.accessToken);


  // fatch user follow and unfollow post butten
  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.post('https://printrest-clone-api.onrender.com/api/users/unfollow', { userId, targetUserId },{
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
        });
        setIsFollowing(false);
      } else {
        await axios.post('https://printrest-clone-api.onrender.com/api/users/follow', { userId, targetUserId },{
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following/unfollowing:', error);
    }
  };

  return (
    <button onClick={handleFollow} className='bg-red-500 py-3 px-5 rounded-3xl text-white'>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
