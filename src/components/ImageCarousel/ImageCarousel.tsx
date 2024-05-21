import Carousel from 'react-multi-carousel';
import { Image } from '@commercetools/platform-sdk';
import styles from '../../pages/DetailedProduct/DetailedProduct.module.css';
import 'react-multi-carousel/lib/styles.css';

type Props = {
  images: Image[];
};

export default function ImageCarousel({ images }: Props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 320 },
      items: 1,
    },
  };
  return (
    <Carousel
      swipeable
      draggable={false}
      showDots
      keyBoardControl
      infinite
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      responsive={responsive}
    >
      {images.map(({ url }: Image, index) => (
        <img key={index} className={styles.image} src={url} alt="Product" />
      ))}
    </Carousel>
  );
}
