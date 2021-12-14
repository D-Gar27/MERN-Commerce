import Slider from '../../components/slider/Slider';
import Cate from '../../components/categories/Cate';
import Items from '../../components/items/Items';
import NewsLetter from '../../components/newsletter/NewsLetter';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {
  return (
    <section className="page">
      <Navbar />
      <Slider />
      <Cate />
      <Items limit={true} />
      <NewsLetter />
      <Footer />
    </section>
  );
};

export default Home;
