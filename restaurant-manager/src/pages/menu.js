import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CategoryCard from "../components/Menu/CategoryCard";
import { Stack, Container, Button } from "@mui/material";
import FoodCard from "../components/Menu/FoodCard";
import Divider from "@mui/material/Divider";
import { useDishService as useMenuService } from "../services/thucan.service";
import { useOrderService } from "../services/hoadon.service";
import { useTableService } from "../services/ban.serivce";
import { useCT_OrderService } from "../services/ct_hoadon.service";
import { formatter } from "../services/uilts/formatPrice";
import { useAlertService } from "../services/alert.service";
import { useAuth } from "../services/account.service";
import CartItemCard from "../components/Menu/CartItemCard";

const Menu = () => {
  const [foodList, setFoodList] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [onSubmit, setOnSubmit] = useState(false);
  const [table, setTable] = useState();
  const [tables, setTables] = useState();
  const table_dataService = useTableService();
  useEffect(() => {
    const list = table_dataService.tablesEnable;
    if (list) {
      setTables(list);
    }
  }, [table_dataService]);
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

  const hoaDonService = useOrderService();
  const ctHoaDonService = useCT_OrderService();
  const alert = useAlertService();
  const auth = useAuth();

  const tableChange = (event) => {
    setTable(event.target.value);
  };
  const handleSubmit = () => {
    if (!onSubmit) {
      setOnSubmit(true);
      hoaDonService
        .addHoaDon({
          ThoiGian: new Date(),
          TongTien: totalPrice,
          ThanhToan: false,
          NhanVien: auth.data.displayName,
          TenBan: table
        })
        .then((res) => {
          console.log(res);
          items.forEach((e, index) => {
            ctHoaDonService
              .addCT_HoaDon({
                Gia: e.price,
                IDHoaDon: res.id,
                IDThucAn: e.id,
                SoLuong: e.amount,
              })
              .then(() => {
                if (index == items.length - 1) {
                  setItems([]);
                  setOnSubmit(false);
                  alert.setAlert({
                    type: "success",
                    body: "Đặt món thành công",
                  });
                  alert.showAlert();
                }
              });
          });
        });
    }
  };

  const removeItem = (item) => {
    setItems(items.filter((e) => e.name != item.name));
  };

  const [categoryList, setCategoryList] = useState([
    {
      name: "Burger",
      selected: 0,
      url: "https://cdn.discordapp.com/attachments/945145709521432636/984539518696845382/3.png",
    },
    {
      name: "Mì Ống",
      selected: 0,
      url: "https://cdn.discordapp.com/attachments/945145709521432636/984537383225659402/PngItem_618485.png",
    },
    {
      name: "Bít Tết",
      selected: 0,
      url: "https://cdn.discordapp.com/attachments/945145709521432636/984537556345565244/kindpng_1146167.png",
    },
    {
      name: "Tráng Miệng",
      selected: 0,
      url: "https://cdn.discordapp.com/attachments/945145709521432636/984540062312202290/PngItem_5764661.png",
    },
    {
      name: "Nước Uống",
      selected: 0,
      url: "https://cdn.discordapp.com/attachments/945145709521432636/984540460418740246/pngfind.com-drinks-png-8691.png",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = (name) => {
    setCategoryList(
      categoryList.map((e) => {
        if (e.name == name) {
          if (e.selected == 0) {
            setSelectedCategory(e.name);
            return { ...e, selected: 1 };
          } else {
            setSelectedCategory("");
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
      totalPrice = totalPrice + parseInt(e.price) * e.amount;
    });
    setTotalPrice(totalPrice);
  }, [items]);

  

  return (
    <Box
      height="100vh"
      // sx={{
      //   backgroundSize: "cover",
      //   backgroundImage:
      //     "url(https://cdn.discordapp.com/attachments/945145709521432636/984530926375677952/unknown.png)",
      // }}
    >
      <Container>
        <Box padding={2}>
          <Grid container>
            <Grid item xs={12} sm={12} md={8}>
              <Typography fontSize={24} fontWeight="bold" color="white">
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
                {foodList
                  .filter((e) => {
                    if (selectedCategory == "") return true;
                    else
                      return (
                        e.data.LoaiThucAn.toLowerCase() ==
                        selectedCategory.toLowerCase()
                      );
                  })
                  .map((item) => (
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
                backgroundColor="rgba(0,0,0,0.7)"
                display="flex"
                flexDirection="column"
                width="100%"
                borderRadius={5}
                alignItems="center"
              >
                <Typography
                  fontWeight="Bold"
                  fontSize={20}
                  padding={1}
                  color="white"
                >
                  Món Đã Đặt
                </Typography>
                <Divider sx={{ width: "100%", borderBottomWidth: 2 }} />
                <Stack
                  spacing={2}
                  padding={2}
                  width="90%"
                  height="45vh"
                  maxHeight="45vh"
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
                <br></br>
                <FormControl>
                  <InputLabel
                    sx={{
                      color: "white",
                      "&.Mui-focused": {
                        color: "white",
                        borderColor: "red"
                      },
                      "&:after": {
                        borderColor: "white"
                      },
                    }}
                  >
                    Bàn đã chọn
                  </InputLabel>
                  <Select
                    sx={{
                      backgroundColor: "rgba(225,225,225,0.4)",
                      width: "15rem",
                      "&:after": {
                        borderColor: "white"
                      },
                    }}
                    onChange={tableChange}
                    value={table ? table : ""}
                    label="Bàn đã chọn"
                  >
                    {tables?.map((item, index) => (
                      <MenuItem key={index} value={item.data.TenBan}>
                        {item.data.TenBan}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box
                  display="flex"
                  flexDirection="column"
                  padding={2}
                  alignItems="center"
                >
                  <Typography fontWeight="Bold" color="white">
                    Tổng Cộng
                  </Typography>
                  <Typography
                    fontSize={34}
                    fontWeight="bold"
                    paddingLeft={2}
                    color="white"
                  >
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
    </Box>
  );
};
export default Menu;
