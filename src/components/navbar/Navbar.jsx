import { FavoriteBorderOutlined, ShoppingCart } from '@material-ui/icons';
import { useState } from 'react';
import { Badge } from '@material-ui/core';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [logout, setLogout] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const logOutHandler = () => {
    localStorage.removeItem('x_3');
    localStorage.removeItem('dk');
    navigate('/login');
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="left">
            <div className="search">
              {isSearching ? (
                <input type="text" className="searching" />
              ) : (
                <input type="text" />
              )}
              <FavoriteBorderOutlined
                className="search-icon"
                onClick={() => setIsSearching(false)}
              />
            </div>
          </div>
          <div className="middle">
            <Link to="/" className="Link">
              <h2>MERN</h2>
            </Link>
          </div>
          <div className="right">
            <p onClick={() => setLogout(true)}>Log out</p>
            <Link to="/cart" className="Link">
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCart />
              </Badge>
            </Link>
          </div>
        </div>
      </nav>
      {logout && (
        <div className="log-out-modal">
          <div className="log-out">
            <h2>Are you sure?</h2>
            <div className="btns">
              <button className="yes-btn" onClick={logOutHandler}>
                Yes
              </button>
              <button className="no-btn" onClick={() => setLogout(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
