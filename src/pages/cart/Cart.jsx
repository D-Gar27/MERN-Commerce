import { ArrowRightAlt } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import './Cart.scss';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../redux/cart.js';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeProduct({ id: id }));
  };

  const clearCart = () => {
    localStorage.removeItem('persist:root');
    window.location.reload();
  };
  return (
    <section className="cart page-top">
      <Navbar />
      <div className="cart-container">
        <h1 className="inCart-title">Your Cart</h1>
        <div className="items-in-cart">
          <div className="items">
            {cart.products.length > 0 &&
              cart.products.map((item, i) => {
                return (
                  <div className="product-item" key={i}>
                    <div className="product-img">
                      <img src={item.img} alt={item.product} />
                    </div>
                    <div className="product-info">
                      <h4>Product : {item.product}</h4>
                      <h4>ID : {item._id}</h4>
                      <h4>Size : {item.size}</h4>
                    </div>
                    <div className="amount">
                      <p
                        onClick={() => handleRemove(item._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        remove
                      </p>
                      <div className="amount-control">
                        <p className="num">{item.itemQuan}</p>
                      </div>
                      <h2 className="price">$ {item.price}</h2>
                    </div>
                  </div>
                );
              })}
            {cart.products.length <= 0 && <h1>Your cart is empty for now</h1>}
          </div>
          <div className="summary">
            <h2>Order Summary</h2>
            <div className="order-info">
              <h4>Total price</h4>
              <p>$ {cart.total}</p>
              <h4>Shipping fee</h4>
              <p>$ 0</p>
              <h3>Final price</h3>
              <h4>$ {cart.total}</h4>
            </div>
            <div className="btns">
              <Link to="/products" className="continue">
                Continue shopping
                <ArrowRightAlt className="arrow" />
              </Link>
              <Link to="/checkout" className="checkout">
                Checkout
              </Link>
              <p
                style={{ cursor: 'pointer', color: 'red', fontWeight: 'bold' }}
                onClick={clearCart}
              >
                Clear Cart
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Cart;
