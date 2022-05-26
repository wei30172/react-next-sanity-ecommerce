import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';

import { CheckoutWizard } from '../components';

const Shipping = () => {
  const router = useRouter();
  
  const { userInfo, shippingAddress, saveShippingAddress }  = useUserContext();

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [shippingInfo, setShippingInfo] = useState(shippingAddress);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, [router, userInfo])

  const onSubmit = () => {
    saveShippingAddress(shippingInfo);
  }

  const handleChange = (e) => {
    setShippingInfo({...shippingInfo, [e.target.name]: e.target.value})
  }

  return (
    <div className="shipping-wrapper">
      <CheckoutWizard activeStep={1}/>
      <div className="shipping-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inner">
            <h2>Shipping Address</h2>
            <div className="form-group">
              <label htmlFor='fullName'>Full Name </label>
              <span className="error">{
                errors.fullName ? errors.fullName.type === 'minLength'
                  ? 'length is more than 1'
                  : 'is required'
                  : ''
              }</span>
              <input
                type="text" name='fullName' value={shippingInfo.fullName}
                {...register('fullName', { required: true, minLength: 2 })}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor='address'>Address </label>
              <span className="error">{
                errors.address ? errors.address.type === 'minLength'
                  ? 'length is more than 1'
                  : 'is required'
                  : ''
              }</span>
              <input
                type="text" name='address' value={shippingInfo.address}
                {...register('address', { required: true, minLength: 2 })}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor='city'>City </label>
              <span className="error">{
                errors.city ? errors.city.type === 'minLength'
                  ? 'length is more than 1'
                  : 'is required'
                  : ''
              }</span>
              <input
                type="text" name='city' value={shippingInfo.city}
                {...register('city', { required: true, minLength: 2 })}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor='postalCode'>Postal Code</label>
              <span className="error">{
                errors.postalCode ? errors.postalCode.type === 'minLength'
                  ? 'length is 5'
                  : 'is required'
                  : ''
              }</span>
              <input
                type="text" name='postalCode' value={shippingInfo.postalCode}
                {...register('postalCode', { required: true, minLength: 5 })}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor='country'>Country</label>
              <span className="error">{
                errors.country ? errors.country.type === 'minLength'
                  ? 'length is more than 1'
                  : 'is required'
                  : ''
              }</span>
              <input
                type="text" name='country' value={shippingInfo.country}
                {...register('country', { required: true, minLength: 2 })}
                onChange={handleChange}
              />
            </div>

            <input className="btn" type="submit" value="CONTINUE" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Shipping