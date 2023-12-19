import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import chat from "../assets/chat.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();

  //using useState hook to initialize the user object
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // toast properties
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  // Checks if the user is logged in, if the use is logged in it redirects it to the '/' page
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);


  // handling the submit button by calling the handleValidation function which returns a true or a false.
  // axios sends a post request to the server that returns with user data and a status
  // if the username or email exists the server sends back a status false with a message
  // if the registration is successful the server sends back the user data, expect the password
  // we than store it in the local storage of the browser and navigates to '/' path
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Form");
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if(data.status===false){
        toast.error(data.msg, toastOptions)
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
      }
      navigate('/')
    }
  };

  //handling Validation using toast every validtion check returns a true or a false.

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length <= 2) {
      toast.error(
        "Username should be atleast 3 characters long.",
        toastOptions
      );
    } else if (password.length < 8) {
      toast.error(
        "Password should be atleast 8 characters long.",
        toastOptions
      );
    } else if (email === "") {
      toast.error("Email should be not be empty.", toastOptions);
    } else {
      return true;
    }
  };

  //On each change in the input this function is fired and the value is stored in the useState variable.
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={chat} alt="Logo"></img>
            <h1>Hichat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button type="Submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height:100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #416a59;
  .brand {
    display: flex;
    align-items:center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #f5eec2;
    border-radius: 0.5rem;
    padding: 3rem 5rem;
    input{
      background-color: transparent;
      padding: 0.5rem 1rem;
      border: 0;
      border-bottom: 0.1rem solid #39395f;
      color: #39395f;
      width: 100%;
      font-size: 1rem;
    }
    button{
      background-color: #a9c25d;
      border: none;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: 0.1s ease-in-out;
      &:hover {
        background-color: #73a24e;
      }
    }
    span{
      color: #39395f;
      text-transform: uppercase;
    }
  }
  }

`;

export default Register;
