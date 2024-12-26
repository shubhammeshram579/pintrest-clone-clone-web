import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Button , Input, Logo} from "../index.js"
import {useForm} from "react-hook-form"
import axios from "axios"
import "..//../Responsive.css"

function Register() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error , setError] = useState("")
   


    // user register post api
    const onSubmit = async (data) => {
      
        try {
          const user = await axios.post('http://localhost:3000/api/users/register', data);
          alert(user.data.message);
          console.log(user)        

        //   navigate router
          navigate("/Login")

        } catch (error) {
          console.log(error);
          if(error){
            setError("There are some errors in your submission")
          }
          alert('Error registration ');
        }
      };

      
  return (
    <div>
        <div id='SignInpagetext' className='bg-slate-200 py-10 px-20 rounded-3xl'>
            <div className='flex items-center justify-center py-2'>
                <Logo />
            </div>
            <h2 className='text-center'>Sign up to create account</h2>
            <h3  className='flex items-center justify-center'>Already have an account?&nbsp; <Link to="/Login"><h1 className='text-red-500'>Sign In</h1></Link>  </h3>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                    label= "Full Name: "
                    placeholder="Enter your full name"
                    {...register("fullname", {
                        required: "Full Name is required"
                    })}/>
                    {errors.fullname && <p className="text-red-600">{errors.fullname?.message}</p>}
                    
                    <Input
                    label= "UserName: "
                    placeholder="Enter your username"
                    {...register("username", {
                        required:"'Username is required"
                    })}/>
                    {errors.username && <p className="text-red-600">{errors.username?.message}</p>}

                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Email address must be a valid address',
                          },
                            })} 
                    />
                    {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    />
                    {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
                    <Button type="submit" className="w-full mt-5 bg-red-600">Create Account</Button>


                </div>
            </form>

        </div>
    </div>
  )
}

export default Register




  // create varible
    // const [fullname, setFullname] = useState("")
    // const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [error, setError] = useState()