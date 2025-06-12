import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-400 rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>
        {
          state === 'Sign Up' && <div className="w-full">
          <p>Full Name</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="text"
            onChange={(e) => setName(e.target.name)}
            value={name}
          />
        </div>
        }
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.name)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.name)}
            value={password}
          />
        </div>
        <button className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account? <span className="text-primary underline cursor-pointer" onClick={()=>{setState('Login')}}> Login here </span>
          </p>
        ) : (
          <p>
            Create a new account? <span className="text-primary underline cursor-pointer" onClick={()=>{setState('Sign Up')}}>Click here</span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
