import {
  AddShoppingCartOutlined,
  FavoriteBorderOutlined,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './Items.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Items = ({ cate, filter, sort, limit }) => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          cate
            ? `${process.env.REACT_APP_API}/products?category=${cate}`
            : `${process.env.REACT_APP_API}/products`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('x_3')}`,
            },
          }
        );
        setData(res.data);
        setFetching(false);
      } catch (error) {}
    };
    fetchProducts();
  }, [cate]);

  useEffect(() => {
    if (filter && filter.size) {
      if (filter.size === 'all') {
        setFiltered([...data]);
      } else {
        const afterFiltered = data.filter((item) =>
          item.size.includes(filter.size)
        );
        setFiltered(afterFiltered);
      }
    } else if (limit) {
      setFiltered([...data].slice(0, 10));
    } else {
      setFiltered([...data]);
    }
  }, [data, filter, limit]);

  useEffect(() => {
    if (sort === 'newest') {
      setFiltered((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'ascend') {
      setFiltered((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFiltered((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  const loader = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section className="popular-products-section">
      <h1>{cate ? cate : 'Popular Products'}</h1>
      {fetching ? (
        <div className="popular-products">
          {loader.map((load) => {
            return <div className="product" key={load}></div>;
          })}
        </div>
      ) : !filtered.length >= 1 ? (
        <div className="not-found-item">
          <h3>Sorry... it seems like we don't have any product for [{cate}]</h3>
        </div>
      ) : (
        <div className="popular-products">
          {filtered.map((item, index) => {
            return <Product item={item} key={index} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Items;

const Product = ({ item }) => {
  const addToFav = async (item) => {
    console.log(item);
  };
  return (
    <div className="product">
      {item && (
        <>
          <div className="product-img">
            <img src={item.img} alt="product" />
          </div>
          <div className="icons">
            <Link
              to={{
                pathname: `/product/${item._id}`,
                state: JSON.stringify(item),
              }}
            >
              <div>
                <AddShoppingCartOutlined style={{ color: 'black' }} />
              </div>
            </Link>
            <div onClick={() => addToFav(item)}>
              <FavoriteBorderOutlined />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
