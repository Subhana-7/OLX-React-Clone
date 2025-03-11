import React from "react";
import "./View.css";
import { useLocation } from "react-router-dom";

function View() {
  const location = useLocation();
  const product = location?.state?.product;

  if (!product) {
    return <div className="viewParentDiv">Product not found</div>;
  }
  const getFormattedDate = (createdAt) => {
    if (!createdAt) return "Date not available";

    if (typeof createdAt === "string") return createdAt;

    if (createdAt.seconds) {
      return new Date(createdAt.seconds * 1000).toLocaleDateString();
    }

    return "Date not available";
  };

  return (
    <div className="viewParentDiv">
      <div className="container">
        <div className="imageSection">
          <div className="imageShowDiv">
            <img src={product.imageUrl} alt={product.name} />
          </div>
        </div>

        <div className="detailsSection">
          <div className="priceCard">
            <div className="priceHeader">
              <h1 className="price">₹ {product.price}</h1>
              <div className="actions">
                <button className="shareButton">
                  <span>Share</span>
                </button>
                <button className="likeButton">
                  <span>♡</span>
                </button>
              </div>
            </div>
            <h2 className="title">{product.name}</h2>
            <div className="location">
              <span className="category">{product.category}</span>
              <span className="postedDate">
                {getFormattedDate(product.createdAt)}
              </span>
            </div>
          </div>

          <div className="sellerCard">
            {/* <div className="sellerInfo">
              <div className="sellerAvatar">
                <div className="avatarCircle">
                  {product.userId[0].toUpperCase()}
                </div>
              </div>
              <h3 className="sellerName">{product.userId}</h3>
            </div> */}
            <button className="chatButton">Chat with seller</button>
          </div>

          <div className="postedInCard">
            <h3>Posted in</h3>
            <p className="category">Category: {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;