import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ProfilePage from './Pages/Profile/ProfilePage';
import Dashboard from './Pages/dashboard/Dashboard';
import FamilyDirectory from './Pages/directory/FamilyDirectory';
//import HomePage from ' ./pages/HomePage';
import TopNavbar from './components/navigation/TopNavbar';
import BottomNavbar from './components/navigation/BottomNavbar';
import GuestDashboard from './Pages/dashboard/GuestDashboard';
// game
import AdminDashboard from './game/pages/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
  <div className="flex flex-col min-h-screen">
    {/* TopNavbar - full width */}
    <div className="w-full">
      <TopNavbar />
    </div>
    
    {/* Main content - with proper spacing for fixed navbars */}
    <main className="flex-grow container mx-auto px-4 pt-4 pb-16 mt-16"> {/* Added mt-16 for top navbar space */}
      <Routes>
        <Route path="/" element={<GuestDashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/gameadm' element={<AdminDashboard />}/>
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/directory" element={
          <PrivateRoute>
            <FamilyDirectory />
          </PrivateRoute>
        } />
      </Routes>
    </main>
    
    {/* BottomNavbar - fixed position */}
    <BottomNavbar className="fixed bottom-0 left-0 right-0 bg-white shadow-md" />
  </div>
</AuthProvider>
    </Router>
  );
}

export default App;