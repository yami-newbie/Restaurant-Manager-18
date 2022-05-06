import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { useAuth } from "../services/account.service";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Button, Typography } from "@mui/material";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function HomePage(props) {
    
    return (
      <div>
        {/* {auth.user ? (
          <div>
            <div>HomePage</div>
            <button onClick={() => auth.signout()}>Sign Out</button>
          </div>
        ) : (
          <div>
            <div>Chưa đăng nhập</div>
            <button>
              <Link to="/signin">Sign In</Link>
            </button>
          </div>
        )} */}
        <AppHeader />
        
        <div style = {{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/img/wp1874159.jpg)",
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       backgroundRepeat: "no-repeat",
                       backgroundAttachment: "fixed",
                       position: "relative",
                       height: "750px"}}>
          <div className="hometext">
            <Typography variant="h1" gutterBottom>
              Chào mừng đến với nhà hàng abcxyz
            </Typography>
            <Button color="secondary" variant="contained">
              Đặt bàn
            </Button>
          </div>
        </div>
      </div>
    );
}

export default HomePage;