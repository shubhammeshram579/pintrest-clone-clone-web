import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "../index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { login as authLogin } from "..//..//../store/AuthSlice.js";

function UserLogin() {  


  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("")




  // fatch user login post api
  const onSubmit = async (data) => {
    try {
      const session = await axios.post(
        "https://printrest-clone-api.onrender.com/api/users/login",
        data,
      );

      console.log(session.data)

      // localStorage token set
      localStorage.setItem("token", session.data.data.accessToken);

      // reduct tookit token set
      dispatch(authLogin(session.data.data));

      // sessionStorage token set
      sessionStorage.setItem("token", session.data.data.accessToken);

      // navigate page
      navigate("/");
      return session.data.data

    } catch (error) {
      if(error && error.message){
        setError("password is incorrect")
      }else{
        setError("Something went wrong")

      }
    }
  };


  // user login form
  return (
    <div className="py-[4vh]">
      <div id="LoginPage" className="bg-slate-200 py-10 px-20 rounded-3xl">
        <div className="flex items-center justify-center py-5">
          <Logo />
        </div>
        <h3 className="text-center">Sign in to your account</h3>
        <p className="mb-5 flex items-center justify-center">
          Don&apos;t have any account?&nbsp;<Link to="/Register"><h1 className="text-red-500">Sign Up</h1></Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Email:"
              placeholder="labham123@gmail.com"
              type="email"
              {...register("email", {
                required: "email required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="123456"
              {...register("password", {
                required: "password required",
              })}
            />
            {error && <p className="text-red-600 pt-2">{error}</p>}

            <Button type="submit" className="w-full mt-5 bg-red-600">
              Sign In{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
