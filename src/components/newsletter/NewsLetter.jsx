import { Send } from '@material-ui/icons';
import './NewsLetter.scss';

const NewsLetter = () => {
  return (
    <section className="news-letter">
      <h1>Join Our Newsletter</h1>
      <h3>Get updates about products</h3>
      <form className="news-form">
        <input type="text" placeholder="Enter your email" />
        <button>
          <Send style={{ color: 'white' }} />
        </button>
      </form>
    </section>
  );
};

export default NewsLetter;
