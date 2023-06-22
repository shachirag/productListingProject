import React, { useState } from "react";
import "./Signup.css";
import nameicon from "../../assets/nameicon.png";
import emailicon from "../../assets/emailicon.png";
import mobileicon from "../../assets/mobileicon.png";
import passwordicon from "../../assets/passwordicon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [usermobile, setUsermobile] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(username, useremail, usermobile, userpassword);
    fetch("https://productlistingproject.onrender.com/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        useremail,
        usermobile,
        userpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        navigate("/login");
      });
  };

  return (
    <div className="signupcontainer">
      <div className="feedbacktext">
        <h1>Feedback</h1>
        <p>Add your products and give us your valuable feedback</p>
      </div>
      <div className="signupform">
        <form>
          <div className="username">
            <img src={nameicon} alt=""></img>
            <input
              type="textbox"
              name="username"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="useremail">
            <img src={emailicon} alt=""></img>
            <input
              type="email"
              name="useremail"
              placeholder="Email"
              onChange={(e) => setUseremail(e.target.value)}
            ></input>
          </div>
          <div className="usermobile">
            <img src={mobileicon} alt=""></img>
            <input
              type="number"
              name="usermobile"
              placeholder="Mobile"
              onChange={(e) => setUsermobile(e.target.value)}
            ></input>
          </div>
          <div className="userpassword">
            <img src={passwordicon} alt=""></img>
            <input
              type="password"
              name="userpassword"
              placeholder="Password"
              onChange={(e) => setUserpassword(e.target.value)}
            ></input>
          </div>
          <p>
            Already have an account?
            <span>
              <Link to="/login" id="userlogin">
                Log in
              </Link>
            </span>
          </p>
          <div className="signupbutton" onClick={handleSubmit}>
            <span>Signup</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
