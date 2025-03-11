import React, { useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext } from "../../store/FirebaseContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { db, user } = useContext(FirebaseContext);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !name || !category || !price) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(image);

      if (!imageUrl) {
        toast.error("Image upload failed");
        return;
      }

      const productData = {
        name,
        category,
        price,
        imageUrl,
        userId: user?.uid || "Guest",
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "products"), productData);
      toast.success("Product uploaded successfully");
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Product upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="createContainer">
        <div className="formWrapper">
          <h2 className="formTitle">POST YOUR AD</h2>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="name">Item name*</label>
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="Name"
                placeholder="Enter item name"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="category">Category*</label>
              <input
                className="input"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="category"
                name="Category"
                placeholder="Enter category"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="price">Price*</label>
              <div className="priceInput">
                <span className="currencySymbol">₹</span>
                <input
                  className="input"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  name="Price"
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="image">Upload Image*</label>
              <div className="fileInputWrapper">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  id="image"
                  accept="image/*"
                  className="fileInput"
                />
              </div>
              {image && (
                <div className="imagePreview">
                  <img alt="Preview" src={URL.createObjectURL(image)} />
                </div>
              )}
            </div>

            <button type="submit" className="submitButton" disabled={loading}>
              {loading ? (
                <span className="loadingText">Please wait...</span>
              ) : (
                <span>Post now</span>
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default Create