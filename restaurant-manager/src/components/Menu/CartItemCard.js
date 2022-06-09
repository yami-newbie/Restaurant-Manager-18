import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
const CartItemCard = (props) => {
  const [item, setItem] = useState({});
  
  const handleClick = () => {
    props.onClick({img: props.img, name: props.name, price: props.price, amount: 1});
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      backgroundColor="rgba(255,255,255,0.7)"
      sx={{ borderRadius: 5}}
      justifyContent="space-between"
      alignSelf="stretch"
      width="100%"
    >
      <Box padding={1} display="flex" alignItems="center">
        <img
          src={props.img}
          width={74}
          height={74}
          style={{ borderRadius: "20px" }}
        ></img>
        <Box>
          <Typography fontWeight="Bold" paddingLeft={1} color="black">
            {props.name}
          </Typography>
          <Box display="flex">
            <Typography paddingLeft={1} color="black">x<span style={{fontWeight:"bold", color:"#2e7d32"}}>{props.amount}</span></Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        padding={1}
        paddingRight={2}
      >
        <DeleteIcon sx={{ color: "red", cursor: "pointer" }} onClick={handleClick} />
        {/* <Typography> {props.price + " VNĐ"} </Typography> */}
      </Box>
    </Box>
  );
};
export default CartItemCard;
