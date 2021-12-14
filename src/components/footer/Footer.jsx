import {
  Email,
  Facebook,
  Instagram,
  LocationOn,
  Phone,
} from '@material-ui/icons';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="about-mern">
        <h1>MERN</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ad
          pariatur. Distinctio aliquid, esse nostrum voluptatum quaerat quia
          omnis laudantium. Qui dolores incidunt inventore iure?
        </p>
        <div className="social-media">
          <div className="social-icon facebook">
            <Facebook style={{ color: 'white' }} />
          </div>
          <div className="social-icon instagram">
            <Instagram style={{ color: 'white' }} />
          </div>
        </div>
      </div>
      <div className="footer-links">
        <h3>Links that might helpful</h3>
        <div className="links">
          <a href="!#" className="footer-link">
            Men fashion
          </a>
          <a href="!#" className="footer-link">
            Women fashion
          </a>
          <a href="!#" className="footer-link">
            Accessories
          </a>
          <a href="!#" className="footer-link">
            Wishlist
          </a>
          <a href="!#" className="footer-link">
            Cart
          </a>
        </div>
      </div>
      <div className="footer-contact">
        <h3>Contact</h3>
        <div className="info">
          <p>
            <LocationOn />
            Hmawbi, Yangon, Myanmar
          </p>
          <p>
            <Phone />
            +95 995********
          </p>
          <p>
            <Email />
            h*******@gmail.com
          </p>
          <div className="cards">
            <img
              src="https://www.nicepng.com/png/full/53-532819_visa-vector-logo-visa-debit.png"
              alt="visa"
            />
            <img
              src="https://www.nicepng.com/png/full/136-1366929_mastercard-logo-payment-method-master-card.png"
              alt="master-card"
            />
            <img
              src="https://www.nicepng.com/png/full/223-2236844_eposnow-logo-paypal-here-logo-paypal-here-logo.png"
              alt="paypal"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
