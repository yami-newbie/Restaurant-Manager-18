import { Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccPreview from "../../components/QuanLyTaiKhoan/AccPreview";
import { useAuth } from "../../services/account.service";
import AddIcon from "@mui/icons-material/Add";

function TaiKhoan() {
  const [accList, setAccList] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    if(auth)
    setAccList(auth.taiKhoan)
  }, [auth])

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {accList.map((acc, i) => (
          <Grid item key={i}>
            <AccPreview acc={acc} />
          </Grid>
        ))}
      </Grid>
      <div style={{ position: "absolute", right: "32px", bottom: "32px" }}>
        <IconButton
          onClick={() => {}}
          color="primary"
          sx={{
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 1)",
              color: "white",
            },
          }}
        >
          <AddIcon sx={{ width: 40, height: 40 }} />
        </IconButton>
      </div>
    </div>
  );
}

export default TaiKhoan;
