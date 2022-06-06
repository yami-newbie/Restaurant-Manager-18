import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const FoodCard = (props) => {
  const [state, setState] = useState({
    color: "black",
    backgroundColor: "white",
    secondaryColor: "#EA6A12",
  });
  const [item, setItem] = useState({});
  
  const handleClick = () => {
    props.onClick({img: props.img, name: props.text, price: props.price, amount: 1});
  };
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        width={200}
        minHeight={180}
        margin={0}
        style={{ cursor: "pointer" }}
        sx={{ borderRadius: 5 }}
        backgroundColor={state.backgroundColor}
        onMouseEnter={() =>
          setState({
            color: "white",
            backgroundColor: "#e28743",
            secondaryColor: "white",
          })
        }
        onMouseLeave={() =>
          setState({
            color: "black",
            backgroundColor: "white",
            secondaryColor: "#EA6A12",
          })
        }
        onClick={handleClick}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingTop={2}
        >
          <img
            src={props.img}
            width={170}
            height={170}
            style={{ borderRadius: "20px" }}
          ></img>
        </Box>
        <Box padding={2}>
          <Typography fontWeight="Bold" color={state.color}>
            {props.text}
          </Typography>
          <br></br>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="Bold" color={state.secondaryColor}>
              {props.price + " VNĐ"}
            </Typography>
            <AddCircleRoundedIcon
              sx={{
                color: state.secondaryColor,
                backgroundColor: state.backgroundColor,
                borderRadius: "50%",
                borderStyle: "none  ",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default FoodCard;
