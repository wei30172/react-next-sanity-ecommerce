import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../context/UserContext";

import { FormInput } from "../components";
import { CheckoutWizard } from "../components";

const Shipping = () => {
  const router = useRouter();
  const { userInfo, shippingAddress, saveShippingAddress } = useUserContext();
  const [shippingInfo, setShippingInfo] = useState(shippingAddress);

  const formInputs = [
    {
      id: 1,
      label: "Full Name",
      errorMessage: "Full Name is required!",
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      required: true,
    },
    {
      id: 2,
      label: "Address",
      errorMessage: "Address is required!",
      name: "address",
      type: "text",
      placeholder: "Address",
      required: true,
    },
    {
      id: 3,
      label: "City",
      errorMessage: "City is required!",
      name: "city",
      type: "text",
      placeholder: "City",
      required: true,
    },
    {
      id: 4,
      label: "Postal Code",
      errorMessage: "Postal Code is required!",
      name: "postalCode",
      type: "text",
      placeholder: "Postal Coded",
      required: true,
    },
    {
      id: 5,
      label: "Country",
      errorMessage: "Country is required!",
      name: "country",
      type: "text",
      placeholder: "Country",
      required: true,
    },
  ];

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
  }, [router, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveShippingAddress(shippingInfo);
  };

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="shipping-wrapper">
      <CheckoutWizard activeStep={1} />
      <div className="shipping-container">
        <form onSubmit={handleSubmit}>
          <div className="form-inner">
            <h2>Shipping Address</h2>

            {formInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={shippingInfo[input.name]}
                onChange={handleChange}
              />
            ))}

            <input className="btn" type="submit" value="CONTINUE" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
