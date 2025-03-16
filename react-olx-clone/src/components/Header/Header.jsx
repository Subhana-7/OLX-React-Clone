import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo.jsx";
import Search from "../../assets/Search.jsx";
import Arrow from "../../assets/Arrow.jsx";
import SellButton from "../../assets/SellButton.jsx";
import SellButtonPlus from "../../assets/SellButtonPlus.jsx";
import { FirebaseContext } from "../../store/FirebaseContext.jsx";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, auth} = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder="India" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span>English</span>
          <Arrow></Arrow>
        </div>
        <div
          className="loginPage"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {user ? (
            <div className="user-profile">
              <span>{user.displayName}</span>
              <hr />
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <Link to="/create" className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;