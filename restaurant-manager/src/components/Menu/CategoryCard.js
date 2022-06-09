import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
const CategoryCard = (props) => {
  const [state, setState] = useState({
    color: "black",
    backgroundColor: "white",
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
      backgroundColor={props.selected? "#e28743" : state.backgroundColor}
      onMouseEnter={() =>
        setState({ color: "white", backgroundColor: "#e28743" })
      }
      onMouseLeave={() =>
        setState({ color: "black", backgroundColor: "white" })
      }
      onClick={props.onClick}
      
    >
      <img
        src={props.img}
        width={100}
        height={100}
        style={{borderRadius: "15px"}}
      />
      <Typography color={props.selected? "white" : state.Color} fontWeight="bold" paddingTop={1}>
        {props.text}
      </Typography>
    </Box>
  );
};
export default CategoryCard;
