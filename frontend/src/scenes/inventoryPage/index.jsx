import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
  const token = useSelector((state) => state?.token);

  const [itemsData, setItemsData] = useState({});

  const getItems = async () => {
    const response = await fetch("http://localhost:3001/items/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data) {
      setItemsData(data);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box display="flex" width="100%" height="100vh" position="relative">
      <Box
        position="fixed"
        style={{
          backgroundImage: 'url("http://localhost:3001/assets/BG_2.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          filter: "blur(3px)",
        }}
      ></Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        padding={"20px"}
        zIndex={2}
      >
        <Typography>Inventory</Typography>
        {itemsData.length > 0 &&
          itemsData.map((item, index) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"wrap"}
              key={index}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                width={"200px"}
                height={"200px"}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background
                }}
              >
                <img
                  src={`http://localhost:3001/assets/${item.image}`}
                  alt="item-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default HomePage;
