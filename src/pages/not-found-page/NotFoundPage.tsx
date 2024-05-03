import './NotFoundPage.css';
import notFoundPageLogo from '../../assets/broken-chair.png';

export default function NotFoundPage() {
  return (
    <div className="not-found-page-container">
      <p className="not-found-page-title">404</p>
      <img src={notFoundPageLogo} className="not-found-page-logo" alt="page-not-found" />
      <p className="not-found-page-title">Page not found</p>
      <p className="not-found-page-description">
        Sorry, but the page that you requested does not exist
      </p>
    </div>
  );
}
