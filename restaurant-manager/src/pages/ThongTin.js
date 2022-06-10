import {
  Grid,
  Avatar,
  Badge,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Role, useAuth } from "../services/account.service";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Input from "../components/custom/Input";
import { useAlertService } from '../services/alert.service'

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function capitalizeFirstLetter(string) {
  if (string) return string.charAt(0).toUpperCase() + string.slice(1);
}

const ButtonC = (props) => {
  const { text, onClick } = props;
  return (
    <Button
      sx={{
        width: "40%",
        height: "50px",
        borderRadius: "10px",
        boxShadow: 5,
        backgroundColor: "#FD6123",
        "&:hover": {
          backgroundColor: "#ED5B21",
        },
      }}
      variant="contained"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

function ThongTin() {
  const auth = useAuth();
  const [displayName, setDisplayName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [file, setFile] = useState();
  const [onEdit, setOnEdit] = useState(false);

  const alert = useAlertService();

  useEffect(() => {
    if (auth) {
      setDisplayName(auth.data?.displayName);
      setPhoneNumber(auth.data?.phoneNumber);
      setPhotoURL(auth.data.photoURL);
      setAddress(auth.data?.address);
    }
  }, [auth]);

  const onChangeImg = (e) => {
    var _file = e.target.files[0];
    setFile(_file);
    var reader = new FileReader();
    reader.readAsDataURL(_file);
    reader.onloadend = (e) => {
      setPhotoURL(e.target.result);
    };
  };

  const onSave = () => {
    try {
      if (file) {
        auth.uploadImg(file).then((res) => {
          setPhotoURL(res);
          auth._updateProfile({
            photoURL: res,
            displayName: displayName,
            phoneNumber: phoneNumber,
            address: address,
            email: auth.user.email,
          });
        });
      } else {
        auth._updateProfile({
          photoURL: photoURL,
          displayName: displayName,
          phoneNumber: phoneNumber,
          address: address,
          email: auth.user.email,
        });
      }

      alert.setAlert({type: "success", body: "Cập nhật tài khoản thành công"})
      alert.showAlert();
    }
    catch(e) {
      console.log(e)
    }
    
    setOnEdit(false);
  };

  const onCancel = () => {
    setOnEdit(false);
    setDisplayName(auth.data.displayName);
    setPhoneNumber(auth.data?.phoneNumber);
    setPhotoURL(auth.data.photoURL);
    setAddress(auth.data?.address);
  };

  const enableEdit = () => {
    setOnEdit(true);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "70%", py: 5, pl: "80px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <>
                <label htmlFor="load-file">
                  <SmallAvatar
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "#FD6123",
                      "&:hover": {
                        backgroundColor: "#ED5B21",
                      },
                    }}
                  >
                    <EditOutlinedIcon />
                  </SmallAvatar>
                </label>
                <input
                  onChange={onChangeImg}
                  accept="image/*"
                  id="load-file"
                  disabled={onEdit ? false : true}
                  type="file"
                  hidden
                />
              </>
            }
          >
            <Avatar
              src={photoURL}
              sx={{ width: "140px", height: "140px", boxShadow: 5 }}
            />
          </Badge>
          <Box sx={{ pl: "40px" }}>
            <Typography variant="h4" component="div">
              {capitalizeFirstLetter(auth.data.displayName)}
            </Typography>
            <Typography variant="h7" color={"#959595"} component="div">
              {auth.data.address}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={5} columns={12} sx={{ mt: "0px" }}>
          <Grid justifyContent="center" item xs={6}>
            <Input
              text="Tên"
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              disabled={onEdit}
              value={displayName}
            />
          </Grid>
          <Grid justifyContent="center" item xs={6}>
            <Input
              text="Địa chỉ"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              disabled={onEdit}
              value={address}
            />
          </Grid>
          <Grid justifyContent="center" item xs={6}>
            <Input
              text="Số điện thoại"
              type="phone"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              disabled={onEdit}
              value={phoneNumber}
            />
          </Grid>
          <Grid justifyContent="center" item xs={6}>
            <Input
              text="Chức vụ"
              disabled={onEdit}
              readOnly={true}
              value={auth.role === Role.admin ? "Quản lý" : "Nhân viên"}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              disabled={onEdit}
              text="Email"
              readOnly={true}
              value={auth.user.email}
            />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{ mt: 5 }}
        >
          {onEdit ? <ButtonC text="Hủy" onClick={onCancel} /> : null}
          <ButtonC
            onClick={onEdit ? onSave : enableEdit}
            text={onEdit ? "Lưu" : "Chỉnh sửa"}
          />
        </Stack>
        {/* <Input text="" /> */}
      </Box>
    </Box>
  );
}

export default ThongTin;
