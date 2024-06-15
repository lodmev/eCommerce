import Description from '../../components/Description/Description';
import ProductOfTheMonth from '../../components/ProductOfTheMonth/ProductOfTheMonth';
import CatalogPreview from '../../components/CatalogPreview/CatalogPreview';
import Promocode from '../../components/Promocode/Promocode';

export default function Main() {
  return (
    <>
      <Description />
      <CatalogPreview />
      <Promocode />
      <ProductOfTheMonth />
    </>
  );
}
