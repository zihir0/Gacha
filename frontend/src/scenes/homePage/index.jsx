import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const player = useSelector((state) => state?.user);

  const token = useSelector((state) => state?.token);

  const [logging, setLogging] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemsData, setItemsData] = useState({});
  const [result, setResult] = useState({});

  const [showAnimation, setShowAnimation] = useState(false);

  const handleClose = () => {
    setLogging(false);
  };

  const getItems = async () => {
    const response = await fetch("http://localhost:3001/itemnotlog/", {
      method: "GET",
    });

    const data = await response.json();
    if (data) {
      setItemsData(data);
    }
  };

  function handlePull(numPulls) {
    const results = [];
    for (let pull = 0; pull < numPulls; pull++) {
      const randomNumber = Math.random();
      let selectedItem = null;
      let cumulativeDropRate = 0;

      for (const item of itemsData) {
        cumulativeDropRate += item.droprate / 100;
        if (randomNumber <= cumulativeDropRate) {
          selectedItem = item;
          addItemToInventory(selectedItem);
          break;
        }
      }

      results.push(selectedItem);
      setResult(selectedItem);

      if (numPulls === 1) {
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
        }, 5900); // Adjust duration as needed
      } else if (numPulls === 10) {
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
        }, 5900); // Adjust duration as needed
      }
    }
    return console.log("Obtained Items:", results);
  }

  const addItemToInventory = async (item) => {
    try {
      const body = {
        item_id: item._id,
        user_id: player._id,
        quantity: 1,
      };
      const response = await fetch("http://localhost:3001/inventory/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Handle success, if needed
        console.log(`Item added: ${item.id}`);
      } else {
        // Handle failure, if needed
        console.error(`Failed to add item: ${item.id}`);
      }
    } catch (error) {
      console.error("Error adding item to inventory:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

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
            <a href="http://localhost:3001/assets/swordbanner_details.png">
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
                onClick={() => {
                  handlePull(1);
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
                onClick={() => {
                  handlePull(10);
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
                  backgroundImage:
                    'url("http://localhost:3001/assets/Bag.jpg")',
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
      <Backdrop
        open={showAnimation}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <img
            src="http://localhost:3001/assets/1_3Star_single.gif"
            alt="common"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              animation: "fadeIn 1s ease-in-out",
            }}
          />
        </Box>
      </Backdrop>
    </Box>
  );
};

export default HomePage;
