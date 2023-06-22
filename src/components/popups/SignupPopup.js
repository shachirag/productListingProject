import React, { useState } from "react";
import "./SignupPopup.css";
import nameicon from "../../assets/nameicon.png";
import emailicon from "../../assets/emailicon.png";
import mobileicon from "../../assets/mobileicon.png";
import passwordicon from "../../assets/passwordicon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignupPopupPopup = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [usermobile, setUsermobile] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      useremail,
      usermobile,
      userpassword,
    };

    fetch("https://productlistingproject.onrender.com/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.success) {
          navigate("/login");
        } else {
          setRegistrationError("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
        setRegistrationError("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="signuppopup-container">
      <div className="signup-popup">
        <h1>Signup to continue</h1>
        <div className="signupformpopup">
          <form>
            <div className="registerusername">
              <img src={nameicon} alt=""></img>
              <input
                type="textbox"
                name="username"
                placeholder="Name"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="registeruseremail">
              <img src={emailicon} alt=""></img>
              <input
                type="email"
                name="useremail"
                placeholder="Email"
                onChange={(e) => setUseremail(e.target.value)}
              ></input>
            </div>
            <div className="registerusermobile">
              <img src={mobileicon} alt=""></img>
              <input
                type="number"
                name="usermobile"
                placeholder="Mobile"
                onChange={(e) => setUsermobile(e.target.value)}
              ></input>
            </div>
            <div className="registeruserpassword">
              <img src={passwordicon} alt=""></img>
              <input
                type="password"
                name="userpassword"
                placeholder="Password"
                onChange={(e) => setUserpassword(e.target.value)}
              ></input>
            </div>
            <span id="loginpopup">
              Already have an account?
              <span>
                <Link to="/loginpopup" id="userloginpopup">
                  Log in
                </Link>
              </span>
            </span>
            <div className="signupbuttonpopup">
              <span onClick={handleSubmit}>Signup</span>
            </div>
            {registrationError && (
              <div className="error-message">{registrationError}</div>
            )}
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

export default SignupPopupPopup;
