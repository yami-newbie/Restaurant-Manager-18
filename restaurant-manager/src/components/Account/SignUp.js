import React, { useState } from "react";
import AccountService from '../../services/account.service'

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const register = (e) => {
    e.preventDefault();
    try {
      AccountService.register({
        username: username, 
        password: password, 
        displayName: displayName
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  
  return (
    <div>
      <form onSubmit={register}>
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
