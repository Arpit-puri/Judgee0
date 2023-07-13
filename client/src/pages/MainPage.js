import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { Link } from "react-router-dom";
import { logoutRoute, run } from "../utils/APIRoutes";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "../App.css";
import Cookies from 'js-cookie';

function MainPage() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const navigate = useNavigate();
  const [code, setCode] = useState(" ");
  const [input, newInput] = useState(" ");
  const [output, setOutput] = useState(" ");
  const [language, setLanguage] = useState("cpp");

  const handleClick = async () => {
    const { data } = await axios.get(logoutRoute);
    if (data.status === true) {
      navigate("/login");
    } else {
      toast.error(data.msg, toastOptions);
    }
  };
  var radio = false;
  const handleSubmit = async () => {
    if (code === " ") {
      toast("Write some code", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      return;
    }
    console.log(radio);
    const payLoad = {
      language,
      code,
      radio,
    };
    const { data } = await axios.post(run, payLoad);
    setOutput(data);
  };
  return (
    <div className="Mainwrapper">
      <header className="Head">
        <div className="name">
          <h2>Online code complier</h2>
        </div>

        <div className="language">
          <label>Language: </label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="cpp">C++ </option>
            <option value="C">C </option>
            <option value="Py">Python</option>
            <option value="Java">Java</option>
          </select>
        </div>
        <button className="compile-button" onClick={handleSubmit}>
          Run
        </button>
        <div className="aside">
          <Button onClick={handleClick}>
            <BiPowerOff />
          </Button>
        </div>
      </header>

      <div>
        <div className="edittorwrap">
          <textarea
            className="code"
            rows={25}
            cols={25}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea>
           <textarea
            className="code-input"
            cols={25}
            rows={12}
            value={input}
            placeholder="Enter the input"
            onChange={(e) => {
              newInput(e.target.value);
            }}
          ></textarea>
          <div className="code-output">
            <p className="para"> Output for your code:</p>
            <span className="out">{output}</span>
          </div>
        </div>
        <footer className="foot">
          <span>copyright © </span>
        </footer>
        <ToastContainer />
      </div>
    </div>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default MainPage;
