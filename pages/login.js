import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  
  const { userInfo, userLogin }  = useUserContext();
  
  useEffect(() => {
    if (userInfo) {
      router.push(redirect || '/');
    }
  }, [router, userInfo, redirect]);

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [userInput, setUserInput] = useState({email: "", password: ""})

  const onSubmit = () => {
    userLogin(userInput, redirect);
  }

  const handleChange = (e) => {
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }

  return (
    <div className="login-wrapper">
       <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inner">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor='email'>Email </label>
            <span className="error">{
              errors.email ? errors.email.type === 'pattern'
                ? 'is not valid'
                : 'is required'
                : ''
            }</span>
            <input
              type="email" name='email' id='email'
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
              type="password" name='password' id='password'
              {...register('password', { required: true, minLength: 6 })}
              onChange={handleChange}
            />
          </div>

          <input className="btn" type="submit" value="LOGIN" />

          Do not have an account?
          <Link href={`/register?redirect=${redirect || '/'}`}><span className="link"> Register</span></Link>
        </div>
      </form>
    </div>
  )
}

export default Login