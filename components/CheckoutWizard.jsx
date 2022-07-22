import React from "react";

const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <div className="checkoutWizard-container">
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div key={step} className="step">
            <p className={index === activeStep ? "index active" : "index"}>
              {index + 1}
            </p>
            <p>{step}</p>
          </div>
        ),
      )}
    </div>
  );
};

export default CheckoutWizard;
