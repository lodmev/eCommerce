import Description from '../../components/Description/Description';
import ProductOfTheMonth from '../../components/ProductOfTheMonth/ProductOfTheMonth';
import CatalogPreview from '../../components/CatalogPreview/CatalogPreview';
import PromoCode from '../../components/Promocode/PromoCode';

export default function Main() {
  return (
    <>
      <Description />
      <CatalogPreview />
      <PromoCode />
      <ProductOfTheMonth />
    </>
  );
}
