import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import API from "../api";
import CommentSection from "./CommentSection";

const Dashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageList, setImageList] = useState([]);

  // Cleanup function to revoke object URL
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        setImageFile(compressedFile);
        const compressedUrl = URL.createObjectURL(compressedFile);
        setImageUrl(compressedUrl);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await API.post("/auth/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setImageList([...imageList, response.data]); 
        alert("Image uploaded successfully!");
      } else {
        console.error("Error uploading image:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
    <div>
      <h1>Dashboard Page</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: "200px" }} />}

        <h3>Uploaded Images:</h3>
        <div>
          {imageList.map((img, index) => (
            <img
            key={index}
            src={img.imageUrl}
            alt="Uploaded"
            style={{ width: "100px", margin: "5px" }}
            />
          ))}
        </div>
      </div>
    </div>
    <CommentSection/>
  </>
  );
};

export default Dashboard;
