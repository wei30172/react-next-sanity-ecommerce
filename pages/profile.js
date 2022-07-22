import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useUserContext } from "../context/UserContext";

import { FormInput } from "../components";

const Profile = () => {
  const router = useRouter();
  const { userInfo, userUpdate } = useUserContext();
  const [userInputs, setUserInputs] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
  });

  const formInputs = [
    {
      id: 1,
      label: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      name: "name",
      type: "text",
      placeholder: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      label: "Email",
      errorMessage: "Email should be a valid email address!",
      name: "email",
      type: "email",
      placeholder: "Email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      required: true,
    },
  ];

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, [router, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    userUpdate(userInputs);
  };

  const handleChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <h2>Profile</h2>

          {formInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={userInputs[input.name]}
              onChange={handleChange}
            />
          ))}

          <input className="btn" type="submit" value="UPDATE" />
          <input
            className="btn back"
            type="button"
            value="CANCEL"
            onClick={() => router.push("/")}
          />
        </div>
      </form>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
