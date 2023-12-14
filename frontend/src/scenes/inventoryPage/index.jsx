import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const InventoryPage = () => {
  const player = useSelector((state) => state?.user);
  const token = useSelector((state) => state?.token);

  const [itemsData, setItemsData] = useState([]);

  const getInventoryByPlayer = async () => {
    const response = await fetch(
      `http://localhost:3001/inventory/player/${player._id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const inventoryData = await response.json();

    if (inventoryData && inventoryData.length > 0) {
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
          const inventoryItem = {
            inventory_id: item._id,
            ...fetchedItem, // Spread fetchedItem properties
          };
          itemData.push(inventoryItem);
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

      const data = await response.json();
      if (data) {
        window.location.reload();
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
        {itemsData.length > 0 ? (
          <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            gap={"10px"}
          >
            {itemsData.map((item, index) => (
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
                    onClick={() => deleteItemFromInventory(item.inventory_id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="h5">
            Inventory Empty. Pull to Get Items
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InventoryPage;
