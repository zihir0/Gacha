import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const InventoryPage = () => {
  const player = useSelector((state) => state?.user);
  const token = useSelector((state) => state?.token);

  const [itemsData, setItemsData] = useState({});

  const getInventoryByPlayer = async () => {
    const response = await fetch(
      `http://localhost:3001/inventory/player/${player._id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const inventoryData = await response.json();

    if (inventoryData) {
      let itemData = [];
      for (const item of inventoryData) {
        const itemResponse = await fetch(
          `http://localhost:3001/items/${item.item_id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedItem = await itemResponse.json();
        if (fetchedItem) {
          itemData.push(fetchedItem);
        }
      }
      setItemsData(itemData);
    }
  };

  const deleteItemFromInventory = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/inventory/delete/${itemId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setItemsData((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        console.log(`Item ${itemId} deleted.`);
      } else {
        console.error(`Failed to delete item ${itemId}`);
      }
    } catch (error) {
      console.error("Error deleting item from inventory:", error);
    }
  };

  useEffect(() => {
    getInventoryByPlayer();
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
        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          gap={"10px"}
        >
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
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteItemFromInventory(item._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryPage;
