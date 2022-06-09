import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';

const StatsCard = (props) => {
    const [boxState, setBoxState] = useState({
        boxShadow: "0",
        backgroundColor: "rgba(0,0,0,0.8)"
    });
    const renderSwitch = (type) => {
        switch (type) {
            case "1":
              return <FastfoodIcon sx={{ color: "white" }}></FastfoodIcon>;
            case "2":
              return <PaidIcon sx={{ color: "white" }}></PaidIcon>;
            case "3":
              return <ShoppingCartIcon sx={{ color: "white" }}></ShoppingCartIcon>;
            case "4":
              return <GroupIcon sx={{ color: "white" }}></GroupIcon>;
            default:
              return <FastfoodIcon sx={{ color: "white" }}></FastfoodIcon>;
          }
    }
  return (
    <Box
      borderRadius={5}
      display="flex"
      flexDirection="column"
      backgroundColor={boxState.backgroundColor}
      width="90%"
      height="7.5rem"
      justifyContent="center"
      alignItems="center"
      boxShadow={boxState.boxShadow}
      style={{ cursor: "pointer" }}
      onMouseEnter={() =>
        setBoxState({ boxShadow: "5", backgroundColor: "rgba(225,225,225,0.2)" })
      }
      onMouseLeave={() =>
        setBoxState({ boxShadow: "0", backgroundColor: "rgba(0,0,0,0.8)" })
      }
    >
      <Typography color="white" fontWeight={600}>
        {props.text}
      </Typography>
      <Typography color="white" fontSize={36} fontWeight={600}>
        {props.value}
      </Typography>
      {renderSwitch(props.type)}
    </Box>
  );
};

export default StatsCard;
