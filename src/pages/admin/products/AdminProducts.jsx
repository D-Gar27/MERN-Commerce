import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from '../components/AdminNav';
import './Products.scss';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/products?newest=true`,
          {
            headers: { authorization: `Bearer ${localStorage.getItem('x_3')}` },
          }
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="admin-page">
      <AdminNav />
      <Sidebar />
      <section className="products-section right-side">
        <DataTable data={products} />
      </section>
    </section>
  );
};

export default AdminProducts;
