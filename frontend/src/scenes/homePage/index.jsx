import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const player = useSelector((state) => state?.user);

  const [logging, setLogging] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setLogging(false);
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
        position="fixed"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="700px" // Increased width
          height="600px" // Increased height
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background
            padding: "20px",
            borderRadius: "15px", // Slightly rounded edges
            overflow: "hidden", // Hide overflow to prevent image distortion
          }}
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
          >
            {player ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "40%",
                  height: "60%",
                  borderRadius: "10px",
                  backgroundImage:
                    'url("http://localhost:3001/assets/Clouds.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textTransform: "none", // Preserve original case of text
                  fontWeight: "bold", // Bolden text
                  fontSize: "16px", // Adjust font size
                }}
              >
                1 X Pull
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "40%",
                  height: "60%",
                  borderRadius: "10px",
                  backgroundImage:
                    'url("http://localhost:3001/assets/Clouds.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textTransform: "none", // Preserve original case of text
                  fontWeight: "bold", // Bolden text
                  fontSize: "16px", // Adjust font size
                }}
                onClick={() => {
                  setLogging(true);
                }}
              >
                1 X Pull
              </Button>
            )}
            {player ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "40%",
                  height: "60%",
                  borderRadius: "10px",
                  backgroundImage:
                    'url("http://localhost:3001/assets/Clouds.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textTransform: "none", // Preserve original case of text
                  fontWeight: "bold", // Bolden text
                  fontSize: "16px", // Adjust font size
                }}
              >
                10 X Pull
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "40%",
                  height: "60%",
                  borderRadius: "10px",
                  backgroundImage:
                    'url("http://localhost:3001/assets/Clouds.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textTransform: "none", // Preserve original case of text
                  fontWeight: "bold", // Bolden text
                  fontSize: "16px", // Adjust font size
                }}
                onClick={() => {
                  setLogging(true);
                }}
              >
                10 X Pull
              </Button>
            )}
          </Box>
          <Box
            position="absolute"
            top={-69}
            right={-400}
            zIndex={1000}
            sx={{ padding: "20px" }}
          >
            {player ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: "blue",
                  borderRadius: "10px",
                  width: "150px", // Increased width
                  height: "50px", // Increased height
                  fontSize: "18px", // Increased font size
                }}
                onClick={() => navigate("/inventory")}
              >
                View Inventory
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  bgcolor: "blue",
                  borderRadius: "10px",
                  width: "150px", // Increased width
                  height: "50px", // Increased height
                  fontSize: "18px", // Increased font size
                }}
                onClick={() => setLogging(true)}
              >
                View Inventory
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {player && (
        <Box
          position={"fixed"}
          top={"10px"}
          left={"10px"}
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <Typography padding={"10px"}>{player?.username}</Typography>
          <Button onClick={() => dispatch(setLogout())}>Logout</Button>
        </Box>
      )}
      <Dialog open={logging} onClose={handleClose}>
        <DialogTitle>You must log in first!</DialogTitle>
        <DialogContent>
          <LoginForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;
