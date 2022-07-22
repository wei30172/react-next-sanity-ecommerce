import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUserContext } from "../context/UserContext";

import { FormInput } from "../components";
import { GrInProgress } from "react-icons/gr";

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { userInfo, userLogin, userLoading } = useUserContext();
  const [userInputs, setUserInputs] = useState({ email: "", password: "" });

  const formInputs = [
    {
      id: 1,
      label: "Email",
      errorMessage: "Email should be a valid email address!",
      name: "email",
      type: "email",
      placeholder: "Email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      required: true,
    },
    {
      id: 2,
      label: "Password",
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character!",
      name: "password",
      type: "password",
      placeholder: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true,
    },
  ];

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [userInfo, router, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(userInputs, redirect);
  };

  const handleChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-wrapper">
      {userLoading ? (
        <GrInProgress size={30} />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="form-inner">
              <h2>Login</h2>
              {formInputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={userInputs[input.name]}
                  onChange={handleChange}
                />
              ))}
              <input className="btn" type="submit" value="LOGIN" />
              Do not have an account?
              <Link href={`/register?redirect=${redirect || "/"}`}>
                <span className="link"> Register</span>
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
