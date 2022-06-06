import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { Button, Container, Divider, Grid, Icon, Stack, TextField, Typography } from '@mui/material'
import './ForgotPassword.css'
import './reset.css'

function ForgotPassword() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const register = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(auth, username, password);
  //     console.log(user);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  return (
    <div className="forgotPassword">
      <Container component="main" maxWidth="xs">
  
        <div className="forgotPasswordone">
          {/* <p>WELCOME</p> */}
        </div>
  
        <div className="forgotPasswordtwo">
          <p>Forgot your password ?</p>
        </div>
        
        <div className="forgotPasswordthree">
          <div className="forgotPasswordthreeOne">
            <p>E-mail</p>
            <input type='text' placeholder="Enter your email" />
          </div>
        </div>
  
        <div className="forgotPasswordfour">
          {/* <div className="fourOne">
            <div className="fourTwo">
              <p>Password</p>
              <a href="">Forgot your password?</a>
            </div>
            <input type='password' placeholder="Enter your password?" />
          </div> */}
        </div>
        
        <div className="forgotPasswordfive">
          <button>Reset Password</button>
        </div>
  
        <div className="forgotPasswordsix">
          <Divider variant="middle">or Sign In with</Divider>
        </div>
  
        <div className="forgotPasswordseven">
          <div className="forgotPasswordsevenOne">
            <button><img src='./GG.png' /> <span>Google</span></button>
          </div>
        </div>

        <div className="forgotPasswordeight">
          <div className="forgotPasswordeightOne">
            <button><img src='./FB.png' /> <span>Facebook</span></button>
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
  
        <div className="forgotPasswordnine">
          <p>Not register yet?</p>
          <a href="">Create an Account</a>
        </div>
  
      </Container>
    </div>
  );
}

export default ForgotPassword;

