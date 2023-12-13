import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CategoryIcon from "@mui/icons-material/Category";
import AddItemForm from "./AddItemForm";

const AdminManageItemsPage = () => {
  const [isAddItem, setIsAddItem] = useState(false);

  const token = useSelector((state) => state.token);

  const navigate = useNavigate();

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

  const handleClose = () => {
    setIsAddItem(false);
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
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant={"h4"}>Manage Items</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsAddItem(true)}
          >
            Add Item
          </Button>
        </Box>
        <Box mt={3}>
          {Object.keys(itemsData).length > 0 ? (
            itemsData.map((item) => (
              <Box key={item.id} my={2}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">{item.description}</Typography>
                {/* Render other item information */}
              </Box>
            ))
          ) : (
            <Typography variant="body1">No items available</Typography>
          )}
        </Box>
      </Box>
      <Dialog open={isAddItem} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <AddItemForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminManageItemsPage;
