import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';

const Register = () => {
  const router = useRouter();
  const { redirect } = router.query;

  const { userInfo, userRegister }  = useUserContext();

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || '/');
    }
  }, [userInfo]);

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [userInput, setUserInput] = useState({name: "", email: "", password: "", confirmPassword: ""})

  
  const onSubmit = () => {
    userRegister(userInput, redirect);
  }

  const handleChange = (e) => {
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inner">
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor='name'>Name </label>
            <span className="error">{
              errors.name ? errors.name.type === 'minLength'
                ? 'length is more than 1'
                : 'is required'
                : ''
            }</span>
            <input
              type="text" name='name'
              {...register('name', { required: true, minLength: 2 })}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor='email'>Email </label>
            <span className="error">{
              errors.email ? errors.email.type === 'pattern'
                ? 'is not valid'
                : 'is required'
                : ''
            }</span>
            <input
              type="email" name='email'
              {...register('email', { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor='password'>Password </label>
            <span className="error">{
              errors.password ? errors.password.type === 'minLength'
                ? 'length is more than 5'
                : 'is required'
                : ''
            }</span>
            <input
              type="password" name='password'
              {...register('password', { required: true, minLength: 6 })}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor='confirmPassword'>confirmPassword </label>
            <span className="error">{
              errors.confirmPassword ? errors.confirmPassword.type === 'minLength'
                ? 'length is more than 5'
                : 'is required'
                : ''
            }</span>
            <input
              type="password" name='confirmPassword'
              {...register('confirmPassword', { required: true, minLength: 6 })}
              onChange={handleChange}
            />
          </div>

          <input className="btn" type="submit" value="REGISTER" />

          Already have an account? 
          <Link href={`/login?redirect=${redirect || '/'}`}><span className="link"> Login</span></Link>
        </div>
      </form>
    </div>
  )
}

export default Register