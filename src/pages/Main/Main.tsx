import Description from '../../components/Description/Description';
import Catalog from '../../components/Catalog/Catalog';
import ProductOfTheMonth from '../../components/ProductOfTheMonth/ProductOfTheMonth';

export default function Main() {
  return (
    <>
      <Description />
      <Catalog isPreview />
      <ProductOfTheMonth />
    </>
  );
}
