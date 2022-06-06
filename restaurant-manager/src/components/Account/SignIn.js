import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { Button, Container, Divider, Grid, Icon, Stack, TextField, Typography } from '@mui/material'
import './SignIn.css'
import './reset.css'
import { fontSize } from "@mui/system";

function SignIn() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const login = async () => {
  //   try {
  //     const user = await signInWithEmailAndPassword(auth, username, password);
  //     console.log(user);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  return (
    <div className="logIn">
      <Container component="main" maxWidth="xs">
  
        <div className="logInone">
          <p>WELCOME</p>
        </div>
  
        <div className="logIntwo">
          <p>Log Into your account</p>
        </div>
        
        <div className="logInthree">
          <div className="logInthreeOne">
            <p>E-mail or Username</p>
            <input type='text' placeholder="Enter your email or username" />
          </div>
        </div>
  
        <div className="logInfour">
          <div className="logInfourOne">
            <div className="logInfourTwo">
              <p>Password</p>
              <a href="">Forgot your password?</a>
            </div>
            <input type='password' placeholder="Enter your password?" />
          </div>
        </div>
        
        <div className="logInfive"><button>Log In</button></div>
  
        <div className="logInsix">
          <Divider variant="middle">or Sign In with</Divider>
        </div>
  
        <div className="logInseven">
          <div className="logInsevenOne">
            <button><img src='./GG.png' /> <span>Google</span></button>
          </div>
        </div>

        <div className="logIneight">
          <div className="logIneightOne">
            <button><img src='./FB.png' /><span>Facebook</span></button>
          </div>
        </div>


        {/* <Stack spacing={2} sx={{ width: "80%", m: "auto", mt: "10px" }}>
          <Button variant="contained" color="inherit"
            sx={{ borderRadius: "100px", fontFamily: "Roboto", fontWeight: "bold" }}
            startIcon={
              <img style={{ width: "32px", height: "32px" }}
                src='./logoGG.png' />}>
            Google
          </Button>
          <Button variant="contained" color="info"
            sx={{ borderRadius: "100px", fontFamily: "Roboto", fontWeight: "bold", fontSize:"16px" }}
            startIcon={
              <img style={{ width: "32px", height: "32px" }}
                src='./FB2.png' />}>
            Facebook
          </Button>
        </Stack> */}
  
        <div className="logInnine">
          <p>Not register yet?</p>
          <a href="">Create an Account</a>
        </div>
  
      </Container>
    </div>
  );
}

export default SignIn;
