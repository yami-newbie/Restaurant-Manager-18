import { useEffect, useState } from "react";
import { useAuth } from "../services/account.service";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayEmail, setDisplayEmail] = useState('');
  const auth = useAuth();

  useEffect(() => {
    setDisplayEmail(auth.user?.email);
  }, [auth])

  const login = async (e) => {
    e.preventDefault();
    try {
      await auth.signin({
        email: email,
        password: password,
      })
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <div>
        <button onClick={async () => auth.signout()}>Log Out</button>
        <p>DisplayName: {displayEmail}</p>
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
