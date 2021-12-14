import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/admin/products" className="side-Link">
        Products
      </Link>
      <Link to="/admin/users" className="side-Link">
        Users
      </Link>
    </aside>
  );
};

export default Sidebar;
