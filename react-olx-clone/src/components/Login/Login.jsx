import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FirebaseContext } from '../../store/FirebaseContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {toast, ToastContainer} from 'react-toastify'
import Logo from '../../assets/olx-logo.png'
import './Login.css'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {auth} = useContext(FirebaseContext)
  const navigate = useNavigate();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/user-not-found":
        return "No account found with this email. Please sign up first.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      default:
        return "An error occurred during login. Please try again.";
    }
  };

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    }
  };

  return (
    <div className="login-container">
      <div className="loginParentDiv">
        <img width="150px" height="auto" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              minLength="6"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          New to OLX? <Link to="/signup">Sign Up</Link>
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

export default Login
