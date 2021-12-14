import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import './Slider.scss';
import model from '../../images/model.png';

const Slider = () => {
  const [slide, setSlide] = useState(1);
  const handleSlide = (dir) => {
    if (dir === 'next') {
      setSlide((ori) => ori + 1);
    } else {
      setSlide((ori) => ori - 1);
    }
  };
  useEffect(() => {
    if (slide > 3) {
      setSlide(1);
    }
    if (slide < 1) {
      setSlide(3);
    }
  }, [slide]);
  return (
    <section className="slider">
      <div className="arrow left" onClick={() => handleSlide('prev')}>
        <ArrowLeftOutlined style={{ fontSize: '2rem' }} />
      </div>
      <div className="contents">
        <Content
          color={'#2d6a4f'}
          name={slide === 1 ? 'next' : slide === 2 ? 'active' : 'prev'}
          img={model}
        />
        <Content
          color={'#9e829c'}
          name={slide === 1 ? 'prev' : slide === 2 ? 'next' : 'active'}
          img={
            'https://www.nicepng.com/png/full/910-9108756_male-models-hairstyle-fashion.png'
          }
        />
        <Content
          color={'#1a759f'}
          name={slide === 1 ? 'active' : slide === 2 ? 'prev' : 'next'}
          img={
            'https://www.pikpng.com/pngl/b/32-324740_may-05-fashion-model-png-clipart.png'
          }
        />
      </div>
      <div className="arrow right" onClick={() => handleSlide('next')}>
        <ArrowRightOutlined style={{ fontSize: '2rem' }} />
      </div>
    </section>
  );
};

export default Slider;

const Content = ({ color, name, img }) => {
  return (
    <div
      className={name ? `content ${name}` : 'content'}
      style={{
        backgroundColor: `${color}`,
      }}
    >
      <img src={img} alt={img} />
      <div className="text-content">
        <h1>Summer Sale</h1>
        <h4>Get 35% off from new arrivals</h4>
        <button>Shop now</button>
      </div>
    </div>
  );
};
