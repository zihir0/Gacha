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
  const token = useSelector((state) => state?.token); // Define token if required

  const [playersData, setPlayersData] = useState({});

  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAddPlayer(false);
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:3001/player", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }, // Use token here
      });

      const data = await response.json();
      if (data) {
        setPlayersData(data);
      }
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []); // Add token to the dependencies array

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
        </Box>

        {/* Player list */}
        <Box mt={3}>
          {playersData.length > 0 ? (
            playersData.map((player) => (
              <Box key={player.id} my={2}>
                <Box container alignItems="center">
                  <Box item xs={8}>
                    <Typography variant="h6">{player.username}</Typography>
                    <Typography variant="body1">{player.email}</Typography>
                  </Box>
                  <Box item xs={4} style={{ textAlign: "right" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        console.log("Changing data for player ID:", player.id);
                      }}
                    >
                      Delete Player Data
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No Players available</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminManagePlayersPage;
