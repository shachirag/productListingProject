import React, { useState } from "react";
import "./Login.css";
import emailicon from "../../assets/emailicon.png";
import passwordicon from "../../assets/passwordicon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [error, setError] = useState("");
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
        setError(data.message); // Set the error message received from the backend
      })
      .catch((error) => {
        console.log("Error:", error);
        setError("An error occurred. Please try again."); // Set a generic error message for any unexpected errors
      });
  };

  return (
    <div className="logincontainer">
      <div className="feedbacktext">
        <h1>Feedback</h1>
        <p>Add your products and give us your valuable feedback</p>
      </div>
      <div className="loginform">
        <form>
          <div className="useremail">
            <img src={emailicon} alt=""></img>
            <input
              type="email"
              name="useremail"
              placeholder="Email"
              onChange={(e) => setUseremail(e.target.value)}
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
          {error && <p className="error-message">{error}</p>}
          <p>
            Don,t have an account?
            <span>
              <Link to="/signup" id="usersignup">
                {" "}
                Sign up
              </Link>
            </span>
          </p>
          <div className="loginbutton" onClick={handleSubmit}>
            <span>Log in</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
