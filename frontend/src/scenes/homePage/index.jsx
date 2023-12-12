import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import NavBar from "scenes/navbar";
import { useState, useEffect } from "react";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isNonMobileScreens) {
        setIsScrolled(window.scrollY > 140);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNonMobileScreens]);

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
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust alpha value here (0.5 = 50% opacity)
            padding: "20px",
            borderRadius: "10px", // Rounded edges
          }}
        >
          <Box
            width={"100%"}
            height={"300px"}
            sx={{ backgroundColor: "#000000", padding: "20px" }}
          ></Box>
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"flex-end"} // Align buttons to the bottom
            width={"100%"}
            height={"150px"}
            sx={{ padding: "20px", mt: "120px" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "blue",
                width: "40%",
                height: "60%",
                borderRadius: "10px",
              }}
            >
              One Pull
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "blue",
                width: "40%",
                height: "60%",
                borderRadius: "10px",
              }}
            >
              Ten Pull
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
