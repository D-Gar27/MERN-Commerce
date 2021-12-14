import { Add, Remove, ShoppingCart } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import NewsLetter from '../../components/newsletter/NewsLetter';
import { addProduct } from '../../redux/cart';
import { useDispatch, useSelector } from 'react-redux';
import './SingleProduct.scss';

const SingleProduct = () => {
  const [fetching, setFetching] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState();
  const productID = useParams().id;
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const cart = useSelector((state) => state.cart);
  const products = cart.products.map((item) => item.product);
  useEffect(() => {
    const getProduct = async () => {
      setFetching(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/products/${productID}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('x_3')}`,
            },
          }
        );
        setProduct(res.data);
        setFetching(false);
      } catch (error) {}
    };
    getProduct();
  }, [productID]);

  const handleAmount = (type) => {
    if (type === 'plus') {
      setQuantity((prev) => prev + 1);
    }
    if (type === 'minus' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = () => {
    const name = product.product;
    if (!products.includes(name)) {
      dispatch(addProduct({ ...product, quantity, size }));
    }
  };
  return (
    <section className="single-product page-top">
      <Navbar />
      <div className="product-section">
        {fetching ? (
          <div className="product-img">
            <div className="img-loading">
              <h2>Loading...</h2>
            </div>
          </div>
        ) : (
          <div className="product-img">
            <img src={product.img} alt={product.product} />
          </div>
        )}
        <div className="product-info">
          {fetching ? (
            <div className="product-name-loading"></div>
          ) : (
            <h2 className="product-name">{product.product}</h2>
          )}
          {fetching ? (
            <div className="product-desc-loading"></div>
          ) : (
            <p className="product-desc">{product.desc}</p>
          )}
          <p className="product-price">$ {product.price}</p>
          <div className="product-check">
            <div className="color">
              <h4>Color</h4>
              {product.colour &&
                product.colour.map((color, index) => {
                  return (
                    <span
                      style={{ backgroundColor: `${color}` }}
                      key={index}
                    ></span>
                  );
                })}
            </div>
            <div className="size">
              <h4>Size</h4>
              <select
                name="size"
                id="sizs"
                onChange={(e) => setSize(e.target.value)}
                required
              >
                <option disabled defaultValue>
                  Size
                </option>
                {product.size &&
                  product.size.map((size, index) => {
                    return (
                      <option value={`${size}`} key={index}>
                        {size}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="checkout">
            <div className="amount">
              <span className="minus" onClick={() => handleAmount('minus')}>
                <Remove />
              </span>
              <span className="number">{quantity}</span>
              <span className="plus" onClick={() => handleAmount('plus')}>
                <Add />
              </span>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to cart <ShoppingCart className="cart" />
            </button>
          </div>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </section>
  );
};

export default SingleProduct;
