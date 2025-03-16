import React, { useState,useEffect, useContext } from 'react'
import Heart from '../../assets/Heart'
import "./Posts.css"
import {Link} from "react-router-dom"
import {db} from "../../firebase/config"
import {collection , getDocs} from "firebase/firestore"


const Posts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error getting products");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if(loading) {
    return(
      <div className="loadingContainer">
        <div className="loadingSpinner">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="postParentDiv">
      {/* <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span className='spanMore' >View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            <Link to="/view" state={{product}}>
              <div className="card" key={product.id} >
                <div className="favorite">
                  <Heart/>
                </div>
                <div className="image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="content">
                  <p className='rate' >&#x20B9; {product.price} </p>
                  <span className='kilometer' >{product.category}</span>
                   <p className='name' >{product.name}</p>
                </div>
                <div className="date">
                  <span>{`Uploaded: ${product.createdAt.toDate().toLocaleDateString()}`}</span>
                </div>
              </div>
            </Link>
          })}
        </div>
      </div> */}

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.slice(0, 5).map((product) => (
            <Link to="/view" state={{ product }} key={product.id} >
              <div className="card" >
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{`Uploaded: ${product.createdAt
                    .toDate()
                    .toLocaleDateString()}`}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts
