import React, { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, username, password);
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
          <button onClick={register}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
