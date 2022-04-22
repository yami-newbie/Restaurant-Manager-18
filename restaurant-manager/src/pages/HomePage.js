import { Link } from "react-router-dom";
import { useAuth } from "../services/firebase";
import Header from "../components/AppHeader";
import Footer from "../components/AppFooter"

function HomePage() {
    const auth = useAuth();

    return (
      <div>
        <Header/>
        {auth.user ? (
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
        )}
        <div className="footer">
          <Footer/>
        </div>
        
      </div>
    );
}

export default HomePage;