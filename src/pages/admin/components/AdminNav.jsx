import { useNavigate } from 'react-router';

const AdminNav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('dk');
    localStorage.removeItem('x_3');
    navigate('/login');
  };
  return (
    <nav className="admin-navbar">
      <h2>Admin Dashboard</h2>
      <p onClick={handleLogout}>Log out</p>
    </nav>
  );
};

export default AdminNav;
