import React from 'react';
import { useRouter } from 'next/router';

import ProtectedRoute from './ProtectedRoute';

const authRoutes = ['/dashboard'];

const AuthWrapper = ({ children }) => {
  const router = useRouter();

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  )
}

export default AuthWrapper