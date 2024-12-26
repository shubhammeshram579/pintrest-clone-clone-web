import React,{useEffect,useState} from 'react'
import {Register as  RegisterComponate} from '../../index.js'
import "..//..//../App.css"

function RegisterPage() {
  const [visible, setVisible] = useState(false)

  useEffect(()=>{
    setTimeout(() =>{
      setVisible(true)
    },100)
  },[])


  return (
    <div className={`RegisterPage mt-32 py-10 ${visible ? "visible" : ""}`}>
      <RegisterComponate />
    </div>
  )
}

export default RegisterPage