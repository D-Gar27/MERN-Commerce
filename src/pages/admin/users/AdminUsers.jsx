import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from '../components/AdminNav';
import Sidebar from '../components/Sidebar';
import UsersDataTable from '../components/UsersTable';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/users`, {
        headers: { authorization: `Bearer ${localStorage.getItem('x_3')}` },
      });
      setUsers(res.data);
    };
    fetchProducts();
  }, []);
  return (
    <section className="admin-page">
      <AdminNav />
      <Sidebar />
      <section className="users-section right-side">
        <UsersDataTable data={users} />
      </section>
    </section>
  );
};

export default AdminUsers;
