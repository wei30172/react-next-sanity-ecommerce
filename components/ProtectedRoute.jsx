import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
// import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { userInfo }  = useUserContext();
  // const { netlifyUser }  = useAuthContext();

  useEffect(() => {
    if (!userInfo) {
      router.push('/')
    }
  }, [router, userInfo])

  if (!userInfo) return null

  return <>{children}</>
}

export default ProtectedRoute