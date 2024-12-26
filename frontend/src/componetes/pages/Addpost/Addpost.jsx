import React ,{useState ,useEffect} from 'react'
import {PostForm,Contenier} from "..//../index.js"
import "..//..//../App.css"
import "..//..//../Responsive.css"

function Addpost() {
  const [visible, setVisible] = useState(false);


  // Animation effect
  useEffect(() => {
    // Delay the visibility state change to trigger smooth transition
    setTimeout(() => {
        setVisible(true);
    }, 100); // Delay for smooth transition
  }, []);


  return (
    
    <div id='AddPostCard' className={`AddPost py-12 mt-32 overflow-hidden ${visible ? "visible" : ""}`}>
        <PostForm />

    </div>
   
   
  )
}

export default Addpost