import React, { useState, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "..//../App.css";
import "..//../Responsive.css"



function Contenier({ children }) {
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef(null);


  // anmiation effect and set time
  useEffect(() => {
    // Delay the visibility state change to trigger smooth transition
    setTimeout(() => {
      setVisible(true);
    }, 800); // Delay for smooth transition
  }, []);



  useEffect(() => {
    if (scrollRef.current) {
      const height = scrollRef.current.offsetHeight;
    }
  }, []);


  // locamotive smooth scroling
  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true, // Enable smooth scrolling on mobile
      inertia: 0.9, // Inertia-based smooth scrolling
      getDirection: true, // Track scroll direction (useful for triggering effects)
      getSpeed: true, // Track scroll speed
      reloadOnContextChange: true, // Reload on content changes
      multiplier: 1,
      touchMultiplier:2,
    });

    // Clean up on component unmount
    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div
      className={`page-container w-full h-full ${visible ? "visible" : ""} `}
      ref={scrollRef}
      id="Contiener"
    >
      {children}
    </div>
  );
}

export default Contenier;
