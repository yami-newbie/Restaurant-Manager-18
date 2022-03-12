import { useState } from "react";
import accountService from '../../services/account.service'

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e) => {
    e.preventDefault();
    try {
      await accountService.login({username: username, password: password})
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
