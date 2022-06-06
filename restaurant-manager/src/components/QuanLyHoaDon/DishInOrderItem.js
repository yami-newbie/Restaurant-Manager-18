import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { formatter } from "../../services/uilts/formatPrice";
import { useDishService } from "../../services/thucan.service";

function DishInOrderItem({ ct, setCt }) {
  const [amount, setAmount] = useState();
  const [name, setName] = useState();
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [imgSrc, setImgSrc] = useState();
  const dataService = useDishService();

  useEffect(() => {
    if (ct) {
      const data = ct.data;
      setAmount(data.SoLuong);
      dataService.getThucAn(data.IDThucAn).then((res) => {
        // console.log(res);
        if (res && res.data) {
          const data = res.data;
          setName(data.TenThucAn);
          setRating(data.Rating);
          setPrice(ct.data.Gia);
          setImgSrc(data.ImgSrc);
        }
      });
    }
  }, [ct]);

  const AddAmount = () => {
    //setAmount(amount + 1);
    setCt({
      ...ct,
      data: {
        ...ct.data,
        SoLuong: amount + 1,
      },
    });
  };

  const RemoveAmount = () => {
    if (amount > 1) {
      setCt({
        ...ct,
        data: {
          ...ct.data,
          SoLuong: amount - 1,
        },
      });
      // setAmount(amount - 1);
    }
  };
  return (
    <Card sx={{ display: "flex", width: "100%", borderRadius: 3 }}>
      <CardContent
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Avatar sx={{ width: "64px", height: "64px", mr: 2 }} src={imgSrc} />
        <Grid
          container
          columns={{ xs: 5, md: 10, sm: 5 }}
          spacing={{ xs: 0, md: 3, sm: 0 }}
          sx={{
            width: "100%",
            ml: 2,
            alignItems: "center",
          }}
        >
          <Grid item xs={5} md={5} sm={5}>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bolder !important" }}
              >
                {name}
              </Typography>
              {/* <Rating readOnly value={rating} /> */}
            </Box>
          </Grid>
          <Grid item xs={5} md={5} sm={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Typography variant="h7" component="div">
                {formatter.format(price)}
              </Typography>
              <Stack
                sx={{ alignItems: "center", justifyContent: "right" }}
                direction="row"
              >
                <IconButton color="primary" onClick={RemoveAmount}>
                  <RemoveCircleOutlineRoundedIcon />
                </IconButton>
                <Typography variant="h7" component="div">
                  {amount}
                </Typography>
                <IconButton color="primary" onClick={AddAmount}>
                  <AddCircleOutlineRoundedIcon />
                </IconButton>
              </Stack>
              <Typography
                sx={{ fontWeight: "bolder !important" }}
                variant="h7"
                component="div"
              >
                {formatter.format(price * amount)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DishInOrderItem;
