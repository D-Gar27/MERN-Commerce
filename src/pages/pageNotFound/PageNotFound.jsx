import './PageNotFound.scss';
import { Link } from 'react-router-dom';
import { ArrowBackTwoTone } from '@material-ui/icons';
import Navbar from '../../components/navbar/Navbar';

const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <Navbar />
      <h1>404</h1>
      <p>Looks like we need to make a page for this one</p>
      <Link to={'/'} className="Link">
        <button>
          <ArrowBackTwoTone className="arrow" />
          Home
        </button>
      </Link>
    </section>
  );
};

export default PageNotFound;
