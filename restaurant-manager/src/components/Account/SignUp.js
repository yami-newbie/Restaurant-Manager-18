import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { Button, Container, Divider, Grid, Icon, Stack, TextField, Typography } from '@mui/material'
import './SignUp.css'
import './reset.css'

function SignUp() {
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
    <div className="signUp">
      <Container component="main" maxWidth="xs">
  
        <div className="one">
          {/* <p>WELCOME</p> */}
        </div>
  
        <div className="two">
          <p>Create your account</p>
        </div>
  
        <div className="four">
          <div className="fourOne">
            <div className="fourTwo">
              <p>First Name</p>
              <a href="">Last Name</a>
            </div>
            <div className="fourThree">
              <input type='text' placeholder="1952" />
              <input type='text' placeholder="1952" />
            </div>
          </div>
        </div>
        
        <div className="three">
          <div className="threeOne">
            <p>Username</p>
            <input type='text' placeholder="19521952" />
          </div>
        </div>

        <div className="three">
          <div className="threeOne">
            <p>E-mail</p>
            <input type='text' placeholder="19521952@gm.uit.edu.vn" />
          </div>
        </div>

        <div className="three">
          <div className="threeOne">
            <p>Password</p>
            <input type='password' placeholder="Enter a password" />
          </div>
        </div>

        <div className="nine">
          {/* <a href="">Create an Account</a> */}
          <div className="nineOne">
            <input type='checkbox' checked="checked " color="red"/>
            <p>I've read and agree with Terms of Service and our Privacy Policy</p>
          </div>
        </div>

        <div className="five"><button>Sign Up</button></div>
  
        {/* <div className="six">
          <Divider variant="middle">or Sign In with</Divider>
        </div> */}
  
        {/* <div className="seven">
          <div className="sevenOne">
            <button><img src='./GG.png' /> <span>Google</span></button>
          </div>
        </div> */}

        {/* <div className="eight">
          <div className="eightOne">
            <button><img src='./GG.png' /> <span>Facebook</span></button>
          </div>
        </div> */}


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
      </Container>
    </div>
  );
}

export default SignUp;
