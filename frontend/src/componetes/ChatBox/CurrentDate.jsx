import React, { useState, useEffect } from 'react';



const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = daysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return `${day}, ${formattedTime}`;
  };

  return (
    <div>
      {/* <h2>Current Date and Time</h2> */}
      <p>--------------  {formatDate(currentDateTime)} --------------</p>
    </div>
  );
};

export default CurrentDateTime;
