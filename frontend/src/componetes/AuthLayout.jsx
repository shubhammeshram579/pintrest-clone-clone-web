import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from  "react-router-dom"


// user login headaler function
export default function AuthLayout({children,authentication =true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    // redux toolket find user status
    const authStatus = useSelector(state => state.auth.isLoggedIn)


    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")

        }
        setLoader(false)

    },[authStatus,navigate, authentication])



    return  loader ? <h1>Loading...</h1> : <>{children}</>
  
}

