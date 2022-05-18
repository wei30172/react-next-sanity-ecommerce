import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  if (!user) return null

  return <>{children}</>
}

export default ProtectedRoute