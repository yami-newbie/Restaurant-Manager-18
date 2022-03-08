import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <form>
        <div>
          <input
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
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
          <button onClick={login}>Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
