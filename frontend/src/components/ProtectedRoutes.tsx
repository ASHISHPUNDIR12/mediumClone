// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../App';
import type { JSX } from 'react';


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
