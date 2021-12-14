import './Cate.scss';
import hoodies from '../../images/hoodies.jpg';
import jackets from '../../images/jackets.jpg';
import sneakers from '../../images/sneakers.jpg';
import { Link } from 'react-router-dom';

const Cate = () => {
  return (
    <section className="categories">
      <Items type="hoodie" img={hoodies} />
      <Items type="jacket" img={jackets} />
      <Items type="sneaker" img={sneakers} />
    </section>
  );
};

export default Cate;

const Items = ({ type, img }) => {
  return (
    <div className="cate-item" style={{ backgroundImage: `url(${img})` }}>
      <div className="text">
        <h2>
          <b>{type}s</b>
        </h2>
        <Link to={`/products/${type}`}>
          <button>SHOP NOW</button>
        </Link>
      </div>
    </div>
  );
};
