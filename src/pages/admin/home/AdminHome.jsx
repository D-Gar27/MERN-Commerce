import AdminNav from '../components/AdminNav';
import Sidebar from '../components/Sidebar';
import './AdminHome.scss';

const Home = () => {
  return (
    <section className="admin-page">
      <AdminNav />
      <Sidebar />
    </section>
  );
};

export default Home;
