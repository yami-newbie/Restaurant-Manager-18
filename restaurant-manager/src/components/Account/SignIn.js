import './SignIn.css'
import './reset.css'
import { Container, Divider } from '@mui/material';
import { useAuth } from '../../services/account.service';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.signin({
      email: "test@gmail.com",
      password: "123456",
    });
    if(auth.user){
      navigate('/');
    }
  }, [auth])

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

        <div className="logInnine">
          <p>Not register yet?</p>
          <a href="">Create an Account</a>
        </div>
  
      </Container>
    </div>
  );
}

export default SignIn;
