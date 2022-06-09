import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CategoryCard from "../components/Menu/CategoryCard";
import { Stack, Container, Button } from "@mui/material";
import FoodCard from "../components/Menu/FoodCard";
import Divider from "@mui/material/Divider";
import { useDishService as useMenuService } from "../services/thucan.service";
import { useOrderService } from "../services/hoadon.service";
import { useCT_OrderService } from "../services/ct_hoadon.service";
import { formatter } from "../services/uilts/formatPrice";

import CartItemCard from "../components/Menu/CartItemCard";

const Menu = () => {
  const [foodList, setFoodList] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
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
            }
      )
    );
  };

  const hoaDonService = useOrderService()
  const ctHoaDonService = useCT_OrderService()

  const handleSubmit = () => {
    hoaDonService.addHoaDon({ThoiGian: new Date(), TongTien: totalPrice, ThanhToan: false}).then(res => {
      console.log(res)
      items.forEach((e, index) => {
        ctHoaDonService.addCT_HoaDon({Gia: e.price, IDHoaDon: res.id, IDThucAn: e.id, SoLuong: e.amount}).then(() => {
          if (index == items.length-1) 
            setItems([]);
        })
      });
    })
    alert("ok!");
  }

  const removeItem = (item) => {
    setItems(items.filter((e) => e.name != item.name));
  };

  const [categoryList, setCategoryList] = useState([
    {
      name: "Burger",
      selected: 0,
      url: "https://product.hstatic.net/1000242782/product/burger_tom_e571306016d34d14a72558d7ea8b4a2d_master.jpg",
    },
    { name: "Mì Ống", selected: 0, url: "" },
    { name: "Bít Tết", selected: 0, url: "" },
    { name: "Tráng Miệng", selected: 0, url: "" },
    { name: "Nước Uống", selected: 0, url: "" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleClick = (name) => {
    setCategoryList(
      categoryList.map((e) => {
        if (e.name == name) {
          if (e.selected == 0) {
            setSelectedCategory(e.name);
            return { ...e, selected: 1 };
          }
          else {
            setSelectedCategory('');
            return { ...e, selected: 0 };
          }
        } else return { ...e, selected: 0 };
      })
    );
  };

  const menuService = useMenuService();

  useEffect(() => {
    setFoodList(menuService.dishes);
  }, [menuService]);

  useEffect(() => {
    var totalPrice = 0;
    items.forEach((e) => {
      totalPrice = totalPrice + parseInt(e.price)*e.amount;
    }); 
    setTotalPrice(totalPrice);
  }, [items]);

  return (
    <Container>
      <Box padding={2}>
        <Grid container>
          <Grid item xs={12} sm={12} md={8}>
            <Typography fontSize={24} fontWeight="bold">
              Menu
            </Typography>
            <Stack spacing={2} direction="row" paddingTop={1}>
              {categoryList.map((e) => {
                return (
                  <CategoryCard
                    text={e.name}
                    img={e.url}
                    selected={e.selected}
                    onClick={() => {
                      handleClick(e.name);
                    }}
                  ></CategoryCard>
                );
              })}
            </Stack>
            <br></br>
            <Grid
              container
              spacing={2}
              sx={{ overflow: "auto", height: "65vh" }}
              marginTop={0}
            >
              {foodList.filter((e) => {
                if (selectedCategory == '') return true;
                else return e.data.LoaiThucAn.toLowerCase() == selectedCategory.toLowerCase();
              }).map((item) => (
                <Grid item sm={6} md={3}>
                  <FoodCard
                    img={item.data.ImgSrc}
                    text={item.data.TenThucAn}
                    price={item.data.Gia}
                    id={item.id}
                    onClick={addItem}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} padding={2} paddingTop={5}>
            <Box
              backgroundColor="white"
              display="flex"
              flexDirection="column"
              width="100%"
              borderRadius={5}
              alignItems="center"
            >
              <Typography fontWeight="Bold" fontSize={20} padding={1}>
                Món Đã Đặt
              </Typography>
              <Divider sx={{ width: "100%", borderBottomWidth: 2 }} />
              <Stack
                spacing={2}
                padding={2}
                width="90%"
                height="55vh"
                maxHeight="55vh"
                sx={{ overflowY: "auto", overflowX: "hidden" }}
              >
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
              <Divider sx={{ width: "90%" }} />
              <Box
                display="flex"
                flexDirection="column"
                padding={2}
                alignItems="center"
              >
                <Typography fontWeight="Bold">Tổng Cộng</Typography>
                <Typography fontSize={34} fontWeight="bold" paddingLeft={2}>
                  {formatter.format(totalPrice)}
                </Typography>
              </Box>
              <Box paddingTop={0}></Box>
              <Button
                variant="contained"
                size="large"
                color="success"
                sx={{ width: "75%", borderRadius: "15px" }}
                onClick={handleSubmit}
              >
                Xác Nhận
              </Button>
              <br></br>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Menu;
