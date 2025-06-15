import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Grid,
  Input,
} from "@mui/material";
import imageCompression from "browser-image-compression";
import API from "../api";
import CommentSection from "./CommentSection";

const   Dashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageList, setImageList] = useState([]);

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
        setImageList((prev) => [...prev, response.data]);
        alert("Image uploaded successfully!");
      } else {
        console.error("Error uploading image:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Input type="file" onChange={handleFileChange} />
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Box>

      {imageUrl && (
        <Card sx={{ maxWidth: 200, mb: 3 }}>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt="Preview"
          />
        </Card>
      )}

      <Typography variant="h6" gutterBottom>
        Uploaded Images
      </Typography>

      <Grid container spacing={2}>
        {imageList.map((img, index) => (
          <Grid item key={index} xs={6} sm={4} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="120"
                image={img.imageUrl}
                alt={`Uploaded-${index}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={5}>
        <CommentSection />
      </Box>
    </Box>
  );
};

export default Dashboard;
