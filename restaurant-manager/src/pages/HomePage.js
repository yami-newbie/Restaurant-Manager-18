import { Link } from "react-router-dom";
import { useAuth } from "../services/firebase";

function HomePage() {
    const auth = useAuth();

    return (
      <div>
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
      </div>
    );
}

export default HomePage;