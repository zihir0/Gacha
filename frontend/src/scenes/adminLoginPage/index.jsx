import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
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
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "10px",
        }}
        zIndex={2}
      >
        <LoginForm />
      </Box>
    </Box>
  );
};

export default AdminLoginPage;
