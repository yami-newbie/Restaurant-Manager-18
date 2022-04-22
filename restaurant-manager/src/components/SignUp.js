import React, { useState } from "react";
import { useAuth } from "../services/account.service";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const auth = useAuth();

  const register = async (e) => {
    e.preventDefault();
    try {
      await auth.signup({
        email: email,
        password: password,
        displayName: displayName,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  
  return (
    <div>
      <div>
        DisplayName: {auth.user?.displayName}    
      </div>
      <form onSubmit={register}>
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
          <input
            placeholder="DisplayName"
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
