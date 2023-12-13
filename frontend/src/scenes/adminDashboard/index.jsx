import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CategoryIcon from "@mui/icons-material/Category";

const AdminDashboardPage = () => {
  const [bannerImage, setBannerImage] = useState(""); // State to hold the banner image URL
  const player = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle uploading a new banner image
  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    // Perform operations to upload the image and update the state with its URL
    // For example:
    // const imageURL = uploadImageToServer(uploadedImage);
    // setBannerImage(imageURL);
  };

  const handleClose = () => {
    // Logic to handle closing
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      position="relative"
    >
      <Box
        position="fixed"
        style={{
          backgroundImage: 'url("http://localhost:3001/assets/BG_main.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          filter: "blur(3px)",
        }}
      ></Box>
      <Box
        position={"absolute"}
        top={0}
        left={0}
        display={"flex"}
        flexDirection={"column"}
        width={"250px"}
        height={"100vh"}
        sx={{ backgroundColor: "#2d3740" }}
        gap={"10px"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography
            variant={"h2"}
            color={"#ffffff"}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/admin/dashboard")}
          >
            GACHA VERSE
          </Typography>
        </Box>
        <Divider sx={{ mb: "40px" }} />
        <Divider />
        <Box
          display={"flex"}
          gap={"10px"}
          ml={"10px"}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <ManageAccountsIcon sx={{ color: "#ffffff" }} />
          <Typography
            variant={"h4"}
            color={"#ffffff"}
            onClick={() => {
              navigate("/admin/manage/players");
            }}
          >
            Manage Players
          </Typography>
        </Box>
        <Divider />
        <Box
          display={"flex"}
          gap={"10px"}
          ml={"10px"}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <CategoryIcon sx={{ color: "#ffffff" }} />
          <Typography
            variant={"h4"}
            color={"#ffffff"}
            onClick={() => {
              navigate("/admin/manage/items");
            }}
          >
            Manage Items
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box
        width="700px" // Increased width
        height="600px" // Increased height
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background
          padding: "20px",
          borderRadius: "15px", // Slightly rounded edges
          overflow: "hidden", // Hide overflow to prevent image distortion
        }}
        zIndex={3}
      >
        <Box
          width={"100%"}
          height={"400px"} // Increased image height
          sx={{
            padding: "20px",
            borderRadius: "15px", // Slightly rounded edges for the image
            overflow: "hidden",
          }}
        >
          <a href="your_link_here">
            {" "}
            {/* Add the URL you want to navigate to here */}
            <img
              src="http://localhost:3001/assets/swordbanner.png" // Replace with your image URL
              alt="Image.jpg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // Ensures the whole image is visible
                borderRadius: "15px", // Uniform border radius for the image
              }}
            />
          </a>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"flex-end"} // Align buttons to the bottom
          width={"100%"}
          height={"150px"}
          sx={{ padding: "20px", mt: "10px" }}
        ></Box>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
