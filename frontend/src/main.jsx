import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider ,createBrowserRouter } from 'react-router-dom'
import {AuthLayout} from "./componetes/index.js"

// import reduct store
import store from "..//..//frontend/store/Store.js"

// import componated pages 
import RegisterPage from './componetes/pages/signup/RegisterPage.jsx'
import LoginPage from './componetes/pages/login/LoginPage.jsx'
import UpdateUser from "./componetes/pages/UpdateUser/UpdateUserDetails.jsx"
import Addpost from './componetes/pages/Addpost/Addpost.jsx'
import EditPost from "./componetes/pages/EditPost/EditPost.jsx"
import SearchResults from "./componetes/pages/SearchPost/PostSearchResult.jsx"


//home page all posts
import HomePosts from "./componetes/pages/HomePosts/HomePosts.jsx"
import HomeSinglePost from "./componetes/pages/HomePosts/HomeSinglePost.jsx"

// get current user post
import OwnerPost from "./componetes/pages/GetPostsbyOwner/OwnerPost.jsx"
// get post user Profile
import GetPotsByUserProfile from "./componetes/pages/GetPostByProfile/GetPotsByUserProfile.jsx"

// git other user post
import GetPostOtherUser from "./componetes/pages/GetpostOtherUser/GetPost.jsx"
import GetPostsByotherUser from "./componetes/pages/GetpostOtherUser/GetPosts.jsx"


// chatbox 
import MessageBoxHomePage from "./componetes/ChatBox/MessageBoxHomePage.jsx"
import NewMessage from "./componetes/ChatBox/NewMessage.jsx"
import ShareProfile from "./componetes/ChatBox/ShareProfileHomePage.jsx"
import ChatMessageBox from "./componetes/ChatBox/ChatMessageBox.jsx"




// create routers
const router = createBrowserRouter([
    
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePosts />,
        },
        {
            path: "/Login",
            element: (
                <AuthLayout authentication={false}>
                    <LoginPage />
                </AuthLayout>
            ),
        },
        {
            path: "/Register",
            element: (
                <AuthLayout authentication={false}>
                    <RegisterPage />
                </AuthLayout>
            ),
        },
        {
            path: "/UpdateUser",
            element: (
                <AuthLayout authentication>
                    <UpdateUser />
                </AuthLayout>
            ),
        },
        {
          path: "/addpost",
          element: (
              <AuthLayout authentication>
                  <Addpost />
              </AuthLayout>
          ),
      },
        {
            path: "/getPost/:userId",
            element: (
                <AuthLayout authentication>
                    <OwnerPost />
                </AuthLayout>
            ),
        },
        {
            path: "/getPostByID/:postId",
            element: (
                <AuthLayout authentication>
                    {/* <GetPostbyId /> */}
                    <GetPostOtherUser />
                </AuthLayout>
            
            ),
        },
        {
            path: "/EditPost/:postId",
            element: (
                <AuthLayout authentication>
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/deletePost/:postId",
            element: (
                <AuthLayout authentication>
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/posts/getAllpost/search",
            element: (
                <AuthLayout authentication>
                    {/* <PostsList /> */}
                    <SearchResults />

                </AuthLayout>
            ),
        },
        {
            path: "/getPostByID2/:postId",
            element: (
                <AuthLayout authentication>
                    <HomeSinglePost/>
                </AuthLayout>
            ),
            
        },
        {
            path: "/getPostByID3/:postId",
            element: (
                <AuthLayout authentication>
                    <GetPostsByotherUser />
                </AuthLayout>
            ),
            
        },
        {
            path: "/getPostByUserPorofile/:userId",
            element: (
                <AuthLayout authentication>
                    <GetPotsByUserProfile/>
                </AuthLayout>
            ),
            
        },
        {
            path: "/otherUser/:from/:to",
            element: (
                <AuthLayout authentication>
                    <ChatMessageBox  />
                    <HomePosts />
                </AuthLayout>
            ),
        },
        {
            path: "/message",
            element: (
                <AuthLayout authentication>
                    <MessageBoxHomePage />
                    <HomePosts />
                </AuthLayout>
            ),
        },
        {
            path: "/newmessage",
            element: (
                <AuthLayout authentication>
                    <NewMessage />
                    <HomePosts />
                </AuthLayout>
            ),
        },
        {
            path: "/shareprofile",
            element: (
                <AuthLayout authentication>
                    <ShareProfile />
                    <HomePosts />
                </AuthLayout>
            ),
        },
    ],

  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider> 
  </React.StrictMode>,
)
