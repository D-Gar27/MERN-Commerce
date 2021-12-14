import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Footer from '../../components/footer/Footer';
import Items from '../../components/items/Items';
import Navbar from '../../components/navbar/Navbar';
import './Products.scss';

const Products = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({});
  const location = useLocation();
  let cate = location.pathname.split('/')[2];
  const [sort, setSort] = useState('newest');
  const handleFilter = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };
  useEffect(() => {
    if (filter.category) {
      navigate({ pathname: `/products/${filter.category}` });
    }
  }, [filter, navigate]);
  return (
    <section className="products-page page-top">
      <Navbar />
      <h1 className="clothes-type">Casual wear</h1>
      <div className="filter">
        <div className="left">
          <label htmlFor="category">
            Filter by :
            <select name="category" id="category" onChange={handleFilter}>
              <option value="hoodie">Hoodie</option>
              <option value="shirt">Shirt</option>
              <option value="tshirt">T-Shirt</option>
              <option value="jacket">Jacket</option>
              <option value="sneaker">Sneaker</option>
              <option value="coat">Coat</option>
              <option value="bag">Bag</option>
              <option value="hat">Hat</option>
            </select>
            {filter.category === 'sneaker' ? (
              <select name="size" id="size" onChange={handleFilter}>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
              </select>
            ) : (
              <select name="size" id="size" onChange={handleFilter}>
                <option value="all">all</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            )}
          </label>
        </div>
        <div className="right">
          <label htmlFor="sort">
            Sort by :
            <select
              name="sort"
              id="sort"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="ascend">Low to high</option>
              <option value="descend">High to low</option>
            </select>
          </label>
        </div>
      </div>
      <Items cate={cate} filter={filter} sort={sort} />
      <Footer />
    </section>
  );
};

export default Products;
