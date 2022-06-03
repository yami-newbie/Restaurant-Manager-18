import { Button } from "@mui/material";
import React from "react";

function TableListItem({
  table = {
    state: true,
    tenban: "bàn 1",
  },
}) {
  return (
    <Button variant={table.state ? "contained" : "outlined"}>
      {table.tenban}
    </Button>
  );
}

export default TableListItem;
