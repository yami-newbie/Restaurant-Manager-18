import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
const CategoryCard = (props) => {
  const [state, setState] = useState({
    color: "white",
    backgroundColor: "rgba(0,0,0,0.7)",
  });
  
  

  return (
    <Box
      paddingTop={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      width={140}
      height={140}
      margin={0}
      style={{ cursor: "pointer" }}
      sx={{ borderRadius: 5 }}
      backgroundColor={props.selected? "rgba(225,225,225,0.7)" : state.backgroundColor}
      onMouseEnter={() =>
        setState({ color: "black", backgroundColor: "rgba(225,225,225,0.7)" })
      }
      onMouseLeave={() =>
        setState({ color: "white", backgroundColor: "rgba(0,0,0,0.7)" })
      }
      onClick={props.onClick}
      
    >
      <img
        src={props.img}
        width={100}
        height={100}
        style={{borderRadius: "15px"}}
      />
      <Typography color={props.selected? "black" : state.color} fontWeight="bold" paddingTop={1}>
        {props.text}
      </Typography>
    </Box>
  );
};
export default CategoryCard;
