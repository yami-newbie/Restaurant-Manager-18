import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchTextField from "../../components/custom/SearchTextField";
import ListOrder from "../../components/QuanLyHoaDon/ListOrder";

function HoaDonPage({list}) {
  const [listOrder, setListOrder] = useState();
  const [search, setSearch] = useState("");
  const [haveRes, setHaveRes] = useState();
  const [filter, setFilter] = useState("Tên khách hàng");

  const filterList = ["Tên khách hàng", "Số điện thoại", "Nhân viên", "Tên bàn", "Mã hóa đơn"];

  const resetData = () => {
    setListOrder(list);
  }

  const ToSearchStr = (dish) => {
    const data = dish.data;
    const space = "&*&";
    return data.TenKhachHang + space + dish.id + space + data.SoDienThoai + space + data.NhanVien;
  }

  useEffect(() => {
    setListOrder(list)
  }, [list]);

  useEffect(() => {
    if (search && search !== "") {
      const result = listOrder.map((dish) => {
        const data = dish.data;
        var str = "";
        switch (filter) {
          case filterList[0]:
            str = data.TenKhachHang;
            break;
          case filterList[1]:
            str = data.SoDienThoai;
            break;
          case filterList[2]:
            str = data.NhanVien;
            break;
          case filterList[3]:
            str = data.TenBan;
            break;
          case filterList[4]:
            str = dish.id;
            break;
          default:
            break;
        }
        if(typeof(str) === "undefined"){
          str = "";
        }
        console.log(str);
        return str.toLowerCase().includes(search) ? dish : null;
      });
      var lastRes = [];

      result.map((res) => (res !== null ? (lastRes = [...lastRes, res]) : res));

      if (lastRes.length === 0) {
        resetData();
        setHaveRes(false);
      } else {
        setListOrder(lastRes);
        setHaveRes(true);
      }
    } else {
      setHaveRes(true);
      resetData();
    }
  }, [search]);

  return (
    <Box>
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
      <Box sx={{ overflowY: "auto", height: "91vh", overflowX: "hidden" }}>
        <Box sx={{mx: 2, my: 2 }}>
          <ListOrder list={listOrder} />
        </Box>
      </Box>
    </Box>
  );
}

export default HoaDonPage;
