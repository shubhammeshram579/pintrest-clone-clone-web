import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Logo,LogoutBtn,PostSearchBar} from "../index.js"
import "..//../Responsive.css";
import axios from "axios";
import { NotificationContext } from "../NotificationPost/NotificationContext.jsx";


function Header({
  setShowNotifications,
  showMassage,
}) {
  const [currentUser, setCurrentUser] = useState([]);
  const { notificationCount } = useContext(NotificationContext);
  const [showMessages, setShowMessages] = useState(false);
  const [ownerUser, setOwnerUser] = useState(false);

  // authstatus user is login or not
  const authStatus = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.user?.accessToken);
  const [loading, setLoading] = useState(true);

  // current user from redux
  const user = useSelector((state) => state.auth.user?.user);


  // fatch current user api
  useEffect(() => {
    
    const fatchCurrentUser = async () => {
      try {
        const userData = await axios.get(
          "https://pintrest-clone-api.vercel.app/api/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log("savePost currentuser",userData.data.data.curentUser._id)
        setCurrentUser(userData.data.data.curentUser);

        setLoading(false);
      } catch (error) {
        // setError(error.message);
        console.log(error.message);
        setLoading(false);
      }
    };

    fatchCurrentUser();
  }, []);



  // notication buttune heandaler
  const handleNotificationsClick = () => {
    setShowNotifications((prev) => !prev);
    // showMessages(null); // Hide messages when showing notifications
  };



  // massage butten hendaler
  const handleMessagesClick2 = () => {
    setShowMessages((prevState) => {
      const newState = !prevState;

      if (newState) {
        navigate("/message");
        // showNotifications(false)
      } else {
        navigate("/");
        // showNotifications(false)
      }
      return newState;
    });
  };



  // massage butten hendaler
  const handleUserClick2 = () => {
    setOwnerUser((prevState) => {
      const newState = !prevState;
      if (newState) {
        navigate(`/getPost/${user._id}`);
      } else {
        navigate("/");
      }
      return newState;
    });
  };

  // page loadig if error
  if (loading) return <div className="py-[90vh]">Loading...</div>;



  // nav items list
  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Register",
      slug: "/Register",
      active: !authStatus,
    },
    {
      name: authStatus ? (
        <h1
          id="navuser"
          className="font-semibold uppercase bg-gray-300 px-4 py-2 rounded-full hover:bg-slate-300"
        >
          {user.fullname[0]}
        </h1>
      ) : (
        "null"
      ),
      slug: authStatus ? `/getPost/${user._id}` : "/getPost/null",
      active: authStatus,
    },
  ];

  return (
    <>
      <header
        className={
          " bg-slate-100 py-8 fixed top-0 w-full z-50 font-semibold px-20"
        }
        id="navhead"
      >
        <nav className={"flex items-center justify-between"}>
          <div className="flex items-center justify-around gap-20">
            {!authStatus ? (
              <Link to="/" id="Logop" className="bnavitem">
                <Logo />
              </Link>
            ) : (
              <Link to="/">
                <Logo />
              </Link>
            )}

            <div>
              <Link
                to="/"
                active={true}
                className=" inline-block py-2 duration-200 bg-black text-white px-6 rounded-full"
                id="navitem"
              >
                Home
              </Link>
            </div>
          </div>

          {authStatus ? (
            <div>
              <Link
                to="/addpost"
                active={authStatus}
                className="bnavitem inline-block px-2 py-3 duration-200 hover:bg-blue-100 rounded-full"
                id="navitem"
              >
                Create
              </Link>
            </div>
          ) : null}

          {authStatus ? (
            <div id="topnavitem" className="sarchbar">
              <PostSearchBar />
            </div>
          ) : null}

          {authStatus ? (
            <button onClick={handleNotificationsClick} id="topnavitem">
              <div className="flex items-center">
                <i class="fa-solid fa-bell text-xl inline-block px-2 py-2 duration-200 hover:bg-blue-100 rounded-full"></i>

                {/* {notification.length === 0 ? null : ( */}
                {authStatus ?(
                <div className=" text-red-500 mb-5 ml-[-10px] text-lg ">
                  {notificationCount > 0 && `${notificationCount}`}
                </div>
                ): null}
                {/* )} */}
              </div>
            </button>
          ) : null}

          {authStatus && (
            <button onClick={handleMessagesClick2} id="topnavitem">
              <i class="fa-solid fa-comment-dots text-xl inline-block px-2 py-2 duration-200 hover:bg-blue-100 rounded-full"></i>
            </button>
          )}



          <ul
            className={" flex items-center justify-between gap-5"}
            id="navList"
          >
            {navItems
              .filter((item) => item.active)
              .map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                    }}
                    className={
                      "inline-block px-auto py-2 p-2 duration-200 hover:bg-blue-200 rounded-full"
                    }
                  >
                    {item.name}
                  </button>
                </li>
              ))}

            {authStatus ? (
              <li id="navuser">
                <LogoutBtn />
              </li>
            ): null}
          </ul>
        </nav>
      </header>


      {/*responsive navbar2 */}
      {authStatus ? (
        <header
          id="navbar2"
          className="fixed bottom-0 z-50 bg-slate-100 h-24 w-full flex items-center"
        >
          <nav className="flex items-center justify-evenly gap-20 w-full">
            {authStatus && (
              <Link to="/" id="navitem" className="bnavitem">
                <Logo />
              </Link>
            )}

            {authStatus && (
              <div>
                <Link
                  to="/addpost"
                  active={authStatus}
                  className="bnavitem inline-block px-2 py-3 duration-200"
                  id="navitem"
                >
                  <i class="fa-solid fa-plus text-2xl text-black bg-gray-300 px-2 py-1 rounded-full"></i>
                </Link>
              </div>
            )}

            {authStatus && (
              <button onClick={handleUserClick2} className="bnavitem">
                <div className="flex items-center">
                  <h1 className="font-semibold uppercase bg-gray-300 px-4 py-2 rounded-full text-xl">
                    {user.fullname[0]}
                  </h1>
                </div>
              </button>
            )}

            {authStatus && (
              <button className="text-xl text-black bg-gray-300 rounded-full">
                <LogoutBtn />
              </button>
            )}
          </nav>
        </header>
      ) : null}
    </>
  );
}

export default Header;