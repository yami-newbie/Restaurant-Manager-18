import {
  Box,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListDish from "../../components/QuanLyMon/ListDish";
import AddIcon from "@mui/icons-material/Add";
import DishDetail from "../../components/QuanLyMon/DishDetail";
import { useDishService } from "../../services/thucan.service";
import SearchTextField from "../../components/custom/SearchTextField";

function QuanLyMonAn() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dishList, setDishList] = useState();
  const [haveRes, setHaveRes] = useState();
  const [filter, setFilter] = useState("Tên món ăn");

  const filterList = ["Tên món ăn"];

  const dishService = useDishService();

  useEffect(() => {
    // console.log(dishService.dishes);
    setDishList(dishService.dishes);
  }, [dishService]);

  useEffect(() => {
    if (search && search !== "") {
      const result = dishList.map((dish) =>
        String(dish.data.TenThucAn).toLowerCase().includes(search) ? dish : null
      );
      var lastRes = [];

      result.map((res) => (res !== null ? (lastRes = [...lastRes, res]) : res));

      if (lastRes.length === 0) {
        lastRes = dishService.dishes;
        setHaveRes(false);
      } else {
        setHaveRes(true);
      }

      setDishList(lastRes);
    } else {
      setHaveRes(true);
      setDishList(dishService.dishes);
    }
  }, [dishService.dishes, search]);

  const onCreateNewDish = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SearchTextField
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onClear={(e) => {
          setSearch("");
        }}
        search={search}
        haveRes={haveRes}
        filter={filter}
        handleChange={(e) => {
          setFilter(e.target.value);
        }}
        filterList={filterList}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          height: "91vh",
        }}
      >
        <ListDish listDish={dishList} />
      </div>
      <div style={{ position: "absolute", right: "32px", bottom: "32px" }}>
        <IconButton
          onClick={onCreateNewDish}
          color="secondary"
        >
          <AddIcon sx={{ width: 50, height: 50 }} />
        </IconButton>
      </div>
      <DishDetail add={true} onClose={onClose} open={open} />
    </div>
  );
}

export default QuanLyMonAn;
