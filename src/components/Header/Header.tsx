import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '../../utils/globalVariables';

export default function Header() {
  return (
    <header>
      <div>This is header</div>
      <div>
        <Link to={ROUTE_PATH.login}>go to login</Link>
      </div>
      <div>
        <Link to={ROUTE_PATH.registration}>register</Link>
      </div>
    </header>
  );
}
