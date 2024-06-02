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

  const [modalCarouselImages, setModalCarouselImages] = useState<Image[]>([]);

  function onImageClick(index: number) {
    const rest = images.slice(0, index);
    const imagesForModal = images.slice(index, images.length).concat(rest);
    setModalCarouselImages(imagesForModal);
    setModal(true);
  }

  return (
    <>
      <Carousel
        className={styles.carousel}
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
            onClick={() => onImageClick(index)}
            key={index}
            className={styles.image}
            src={url}
            alt="Product"
          />
        ))}
      </Carousel>
      <PureModal
        className={styles.modal}
        width="70%"
        header={productProjection?.name?.[userLanguage]}
        isOpen={modal}
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <Carousel
          className={styles['modal-carousel']}
          swipeable={false}
          draggable={false}
          showDots
          keyBoardControl
          infinite
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          responsive={responsive}
        >
          {modalCarouselImages.map(({ url }: Image, index) => (
            <img
              onClick={() => onImageClick(index)}
              key={index}
              className={styles.image}
              src={url}
              alt="Product"
            />
          ))}
        </Carousel>
      </PureModal>
      ;
    </>
  );
}
