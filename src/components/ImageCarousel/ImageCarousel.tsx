import Carousel from 'react-multi-carousel';
import { Image, ProductProjection } from '@commercetools/platform-sdk';
import PureModal from 'react-pure-modal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../pages/DetailedProduct/DetailedProduct.module.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { getProductById } from '../../api/products';
import { useStoreSelector } from '../../hooks/userRedux';

type Props = {
  images: Image[];
};

export default function ImageCarousel({ images }: Props) {
  const { userLanguage } = useStoreSelector((state) => state.userData);
  const { id } = useParams();
  const [productProjection, setProductProjection] = useState({} as ProductProjection);
  useEffect(() => {
    getProductById(id!).then((product) => setProductProjection(product));
  }, []);
  const [modal, setModal] = useState(false);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 320 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots
        keyBoardControl
        infinite
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}
        autoPlay
        autoPlaySpeed={3000}
        customTransition="all .5"
        transitionDuration={500}
      >
        {images.map(({ url }: Image, index) => (
          <img
            onClick={() => setModal(true)}
            key={index}
            className={styles.image}
            src={url}
            alt="Product"
          />
        ))}
      </Carousel>
      <PureModal
        header={productProjection?.name?.[userLanguage]}
        footer={
          <div className={styles['modal-button']}>
            {productProjection?.description?.[userLanguage]}
          </div>
        }
        isOpen={modal}
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <img className={styles.image} src={images[0].url} alt="Product" />
      </PureModal>
      ;
    </>
  );
}
