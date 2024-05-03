export const ROUTE_PATH = {
  main: '/',
  aboutUs: '/about-us',
  basket: '/basket',
  catalogProduct: '/catalog-product',
  detailedProduct: '/detailed-product',
  login: '/login',
  registration: '/registration',
  userProfile: '/user-profile',
};

// я добавил этот импорт пока сюда временно,
// чтобы линтер не ругался
// он будет просить меня поменять export const ROUTE_PATH = {}
// на export default, т.к. пока только один експорт
// потом можно убрать этот експорт
// когда еще переменные добавятся
export const FAKE_API_URL = '';
