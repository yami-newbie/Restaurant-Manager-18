import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import DishDetails from "../components/DishDetails";
import ListDish from "../components/ListDish";
import { useAuth } from "../services/account.service";

function HomePage() {
    const auth = useAuth();

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
        <ListDish />
      </div>
    );
}

export default HomePage;