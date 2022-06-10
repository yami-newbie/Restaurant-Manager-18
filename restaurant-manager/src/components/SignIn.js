import {
  Box,
  Button,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../services/account.service";
import { backgroundSrc } from "../services/Const";
import Input from "./custom/Input";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState();

  const auth = useAuth();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await auth.signin({
        email: email,
        password: password,
      });
    } catch (err) {
      const message = err.message;
      console.log(message)
      if (
        String(message).includes("auth/invalid-email") ||
        String(message).includes("auth/wrong-password") ||
        String(message).includes("auth/user-not-found")
      ) {
        setErrMessage("Tài khoản hoặc mật khẩu không đúng");
      }
    }
  };

  useEffect(() => {
    if(auth.user){
      navigate("/")
    }
  }, [auth])

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: "cover",
        justifyContent: "space-between",
      }}
    >
      {/* <div /> */}
      <Box
        sx={{
          width: "50%",
          maxWidth: "450px",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "70%", maxWidth: "350px" }}>
            <Typography
              variant="h4"
              component="h3"
              sx={{ pb: errMessage ? 1 : 4 }}
            >
              Đăng nhập
            </Typography>
            {errMessage ? (
              <div style={{ paddingBottom: 20, color: "red" }}>
                {errMessage}
              </div>
            ) : null}
            <Stack spacing={3}>
              <Input
                text="Tên đăng nhập"
                textAlign="start"
                type="email"
                width="100%"
                hideLabel={true}
                disabled={true}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={errMessage ? true : false}
                value={email}
                variant="outlined"
              />
              <Input
                text="Mật khẩu"
                textAlign="start"
                hideLabel={true}
                disabled={true}
                width="100%"
                error={errMessage ? true : false}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <Link sx={{ textAlign: "end" }}>
                <span style={{ cursor: "pointer" }}>Quên mật khẩu</span>
              </Link>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  height: "45px",
                  borderRadius: "10px",
                }}
                onClick={login}
              >
                Đăng nhập
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "45px",
                  borderRadius: "10px",
                }}
                startIcon={<GoogleIcon />}
              >
                đăng nhập với google
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
