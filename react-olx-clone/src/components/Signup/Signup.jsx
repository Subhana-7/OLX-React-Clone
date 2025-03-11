import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../../store/FirebaseContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Logo from '../../assets/olx-logo.png'
import "./Signup.css"

const Signup = () => {

  const [username, setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("")
  const [password, setPassword] = useState("")
  const {auth,db} = useContext(FirebaseContext);
  const navigate = useNavigate();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please use a different email or login.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled. Please contact support.";
      case "auth/weak-password":
        return "Password should be at least 6 characters long.";
      default:
        return "An error occurred during signup. Please try again.";
    }
  };

  const validateForm = () => {
    if (!username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        phone: phone,
      });

      toast.success("Sign up successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    }
  };

  return (
    <div className="signup-container">
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              minLength="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              className="input"
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              minLength="6"
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Signup
