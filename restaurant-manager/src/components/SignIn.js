import { useState } from "react";
import HomePage from "../pages/HomePage";
import { useAuth } from "../services/firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const login = async (e) => {
    e.preventDefault();
    try {
      await auth.signin({
        email: email,
        password: password,
      });
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };
  return (
    <div>
      <div>
        <button
          onClick={async () => {
            auth.signout();
          }}
        >
          Log Out
        </button>
        <p>DisplayName: {auth.user?.displayName}</p>
      </div>
      <div>
        <button
          onClick={async () => {
            if (auth.user !== null)
              await auth._sendPasswordResetEmail(auth.user.email);
            else console.log("Chua dang nhap");
          }}
        >
          Reset Password
        </button>
      </div>
      <form onSubmit={login}>
        <div>
          <input
            placeholder="Username"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button>Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
