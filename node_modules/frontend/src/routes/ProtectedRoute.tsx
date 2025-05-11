import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

interface Props { children: JSX.Element; }
export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore(s => s.token);
  return token ? children : <Navigate to="/login" />;
}