import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CategoryCard from "../components/Menu/CategoryCard";
import { Stack, Container } from "@mui/material";
import FoodCard from "../components/Menu/FoodCard";
import Divider from "@mui/material/Divider";
import { useDishService as useMenuService } from "../services/thucan.service";

import CartItemCard from "../components/Menu/CartItemCard";

const Menu = () => {
  const [foodList, setFoodList] = useState([]);
  const [items, setItems] = useState([]);
  const addItem = (item) => {
    const duplicate = items.filter((e) => e.name === item.name);
    if (duplicate.length == 0 || items.length == 0) {
      setItems([item, ...items]);
      return;
    }
    setItems(
      items.map((e) =>
        e.name !== item.name
          ? e
          : {
              ...e,
              amount: e.amount + 1,
              price: (parseInt(e.price) + parseInt(e.price)).toString(),
            }
      )
    );
  };

  const removeItem = (item) => {
    setItems(items.filter((e) => e.name != item.name));
  };

  const menuService = useMenuService();

  useEffect(() => {
    setFoodList(menuService.dishes);
  }, [menuService]);

  return (
    <Container>
      <Box padding={2}>
        <Grid container>
          <Grid item xs={12} sm={12} md={8.5}>
            <Typography fontSize={24} fontWeight="bold">
              Menu
            </Typography>
            <Stack spacing={2} direction="row" paddingTop={1}>
              <CategoryCard
                img="https://cdn-icons-png.flaticon.com/512/198/198416.png"
                text="Burger"
              />
              <CategoryCard
                img="https://cdn.icon-icons.com/icons2/1465/PNG/512/548spaghetti_100786.png"
                text="Mì Ý"
              />
              <CategoryCard
                img="https://cdn-icons-png.flaticon.com/512/198/198416.png"
                text="Burger"
              />
              <CategoryCard
                img="https://cdn-icons-png.flaticon.com/512/198/198416.png"
                text="Burger"
              />
            </Stack>
            <br></br>
            <Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <FoodCard
                    img="https://product.hstatic.net/1000242782/product/burger_tom_e571306016d34d14a72558d7ea8b4a2d_master.jpg"
                    text="Burger Tôm"
                    price="17000"
                    onClick={addItem}
                  />
                </Grid>
                <Grid item>
                  <FoodCard
                    img="https://product.hstatic.net/1000242782/product/burger_tom_e571306016d34d14a72558d7ea8b4a2d_master.jpg"
                    text="Burger Gà"
                    price="99000"
                    onClick={addItem}
                  />
                </Grid>
                {foodList.map((item) => (
                  <Grid item>
                    <FoodCard
                      img={item.data.ImgSrc}
                      text={item.data.TenThucAn}
                      price={item.data.Gia}
                      onClick={addItem}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={3.5} padding={2}>
            <Box
              backgroundColor="white"
              display="flex"
              flexDirection="column"
              width="100%"
              borderRadius={5}
            >
              <Typography fontWeight="Bold" fontSize={20} padding={1}>
                Món Đã Đặt
              </Typography>
              <Divider sx={{ width: "100%" }} />
              <Stack spacing={2} paddingTop={2}>
                {items.map((item, index) => (
                  <CartItemCard
                    name={item.name}
                    img={item.img}
                    price={item.price}
                    amount={item.amount}
                    key={index}
                    onClick={removeItem}
                  ></CartItemCard>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Menu;
