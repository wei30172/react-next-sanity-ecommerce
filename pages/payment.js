import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import { toast } from 'react-hot-toast';

import { CheckoutWizard } from '../components';

const payment = () => {
  const router = useRouter();

  const { shippingAddress, paymentMethod, savePaymentMethod }  = useUserContext();

  const [paymentInfo, setPaymentInfo] = useState(paymentMethod);

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    }
  }, [shippingAddress, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentInfo) {
      toast.error('Payment method is required');
    } else {
      savePaymentMethod(paymentInfo);
    }
  }

  return (
    <div className="payment-wrapper">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <div className="payment-container">
        <form onSubmit={handleSubmit}>
          <div className="form-inner">
            <h2>Shipping Address</h2>
            <div className="radio-group">
              <label>
                <input
                  type="radio" name="paymentInfo" value="PayPal"
                  checked={paymentInfo === 'PayPal'} onChange={(e) => setPaymentInfo(e.target.value)}
                />
                PayPal
              </label>
            </div>
            <div className="radio-group">
              <label>
                <input
                  type="radio" name="paymentInfo" value="Stripe"
                  checked={paymentInfo === 'Stripe'} onChange={(e) => setPaymentInfo(e.target.value)}
                />
                Stripe
              </label>
            </div>
            <div className="radio-group">
              <label>
                <input type="radio" name="paymentInfo" value="Cash"
                  checked={paymentInfo === 'Cash'} onChange={(e) => setPaymentInfo(e.target.value)}
                />
                Cash
              </label>
            </div>
            <input className="btn" type="submit" value="Continue" />
            <input className="btn back" type="button" value="Back" onClick={() => router.push('/shipping')}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default payment