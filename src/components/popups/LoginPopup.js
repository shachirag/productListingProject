import React, { useState } from "react";
import "./LoginPopup.css";
import { useNavigate } from "react-router-dom";
import emailicon from "../../assets/emailicon.png";
import passwordicon from "../../assets/passwordicon.png";

const LoginPopup = () => {
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(useremail, userpassword);
    fetch("https://productlistingproject.onrender.com/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        useremail,
        userpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        const token = data.token;
        const username = data.username;
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedIn", true);
        navigate("/");
      });
  };

  return (
    <div className="loginpopup-container">
      <div className="login-popup">
        <h1>Log in to continue</h1>
        <div className="loginformpopup">
          <form>
            <div className="loginuseremail">
              <img src={emailicon} alt=""></img>
              <input
                type="email"
                name="useremail"
                placeholder="Email"
                onChange={(e) => setUseremail(e.target.value)}
              ></input>
            </div>
            <div className="loginuserpassword">
              <img src={passwordicon} alt=""></img>
              <input
                type="password"
                name="userpassword"
                placeholder="Password"
                onChange={(e) => setUserpassword(e.target.value)}
              ></input>
            </div>
            <div className="loginbuttonpopup">
              <span onClick={handleSubmit}>Log in</span>
            </div>
          </form>
        </div>
        <div className="text">
          <h1> Feedback</h1>
          <p>
            Add your <br></br>products and <br></br>rate other <br></br>item
            here.........
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
