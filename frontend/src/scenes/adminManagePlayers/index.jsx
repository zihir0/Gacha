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

const AdminManagePlayersPage = () => {
  const [isAddPlayer, setIsAddPlayer] = useState(false); // Define useState
  const [token, setToken] = useState(""); // Define token if required

  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAddPlayer(false);
  };

  useEffect(() => {
    // Replace this fetch operation with your actual API call to get players
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3001/players/", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // Use token here
        });

        const data = await response.json();
        if (data) {
          dispatch({ type: "SET_PLAYERS", payload: data });
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    // Call the function to fetch players
    fetchPlayers();
  }, [dispatch, token]); // Add token to the dependencies array

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      position="relative"
    >
      {/* Sidebar */}
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

      {/* Main Content */}
      <Box
        width="700px"
        height="600px"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "20px",
          borderRadius: "15px",
          overflow: "hidden",
        }}
        zIndex={3}
      >
        {/* Title and Delete Player button */}
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h4">Manage Players</Typography>
          <Button variant="contained" color="primary">
            Delete Player
          </Button>
        </Box>

        {/* Player list */}
        <Box mt={3}>
          {players && players.length > 0 ? (
            players.map((player) => (
              <Box key={player.id} my={2}>
                <Typography variant="h6">{player.username}</Typography>
                {/* Render other player information */}
              </Box>
            ))
          ) : (
            <Typography variant="body1">No players available</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminManagePlayersPage;
