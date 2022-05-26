import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const router = useRouter();

  const { userInfo, userUpdate }  = useUserContext();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [userInput, setUserInput] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
  })
  
  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
  }, [userInfo])

  const onSubmit = () => {
    userUpdate(userInput)
  }

  const handleChange = (e) => {
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }

  return (
    <div className="profile-wrapper">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-inner">
        <h2>Profile</h2>
        <div className="form-group">
          <label htmlFor='name'>Name </label>
          <span className="error">{
            errors.name ? errors.name.type === 'minLength'
              ? 'length is more than 1'
              : 'is required'
              : ''
          }</span>
          <input
            type="text" name='name' value={userInput.name}
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
            type="email" name='email' value={userInput.email}
            {...register('email', { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
            onChange={handleChange}
          />
        </div>

        <input className="btn" type="submit" value="UPDATE" />
        <input className="btn back" type="button" value="CANCEL" onClick={() => router.push('/')}/>
      </div>
    </form>
  </div>
  )
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });