import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import GuestDashboard from './GuestDashboard';

export default function Dashboard() {
  const { userRole } = useAuth();

  return (
    <div className="container mx-auto p-4">
      {userRole === 'admin' && <AdminDashboard />}
      {userRole === 'user' && <UserDashboard />}
      {(!userRole || userRole === 'guest') && <GuestDashboard />}
    </div>
  );
}