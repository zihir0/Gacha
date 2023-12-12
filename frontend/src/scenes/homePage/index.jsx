import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
          width="600px"
          height="500px"
          sx={{ backgroundColor: "#ffffff", padding: "20px" }}
        >
          <Box
            width={"100%"}
            height={"300px"}
            sx={{ backgroundColor: "#000000", padding: "20px" }}
          ></Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            width={"100%"}
            height={"150px"}
            sx={{ backgroundColor: "blue", padding: "20px", mt: "20px" }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <IconButton>
                <Button>One Time Pull</Button>
              </IconButton>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <IconButton>
                <Button>Ten Time Pull</Button>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
