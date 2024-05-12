import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faCartShopping,
  faDoorOpen,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ROUTE_PATH } from '../../utils/globalVariables';
import styles from './Header.module.css';
import { useUserDispatch, useUserSelector } from '../../hooks/userRedux';
import { setUserLogout } from '../../store/slices/userSlice';

export default function Header() {
  const { isUserAuthorized } = useUserSelector((state) => state.userData);
  const dispatch = useUserDispatch();

  const handleLogout = () => {
    dispatch(setUserLogout());
  };

  return (
    <header>
      <div className={styles.container}>
        <Link to={ROUTE_PATH.main} className={styles.logo}>
          <svg id="x3DvYpFrx" viewBox="0 0 350 228.37987995052077" height="100%">
            <defs id="SvgjsDefs1018">
              <linearGradient id="SvgjsLinearGradient1023">
                <stop id="SvgjsStop1024" stopColor="#905e26" offset="0" />
                <stop id="SvgjsStop1025" stopColor="#f5ec9b" offset="0.5" />
                <stop id="SvgjsStop1026" stopColor="#905e26" offset="1" />
              </linearGradient>
              <linearGradient id="SvgjsLinearGradient1027">
                <stop id="SvgjsStop1028" stopColor="#905e26" offset="0" />
                <stop id="SvgjsStop1029" stopColor="#f5ec9b" offset="0.5" />
                <stop id="SvgjsStop1030" stopColor="#905e26" offset="1" />
              </linearGradient>
            </defs>
            <g
              id="SvgjsG1019"
              transform="matrix(1.6391582570473004,0,0,1.6391582570473004,90.67461385485554,-0.0350425775083992)"
              fill="url(#SvgjsLinearGradient1023)"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                fill="url(#SvgjsLinearGradient1023)"
                d="M92.139,54.505c-6.827-10.277-15.203-4.646-26.324-1.971c-11.121,2.673-8.447-14.782,1.548-30.267  c9.994-15.485,0.212-21.116-7.32-16.049c-4.99,3.357-30.06,14.671-34.49,3.801c-1.167-2.864-2.306-5.93-4.136-7.76  c-0.389-0.39-0.563-0.141-0.431,0.286c0.27,0.875,0.484,1.551,0.873,3.218c0.41,1.662,0.852,3.693,1.292,6.038  c0.457,2.343,0.861,5.005,1.21,7.924c0.329,2.919,0.643,6.093,0.777,9.46c0.1,1.683,0.133,3.414,0.176,5.183  c0.034,0.885,0.016,1.78,0.008,2.683c-0.008,0.903-0.017,1.815-0.025,2.735c-0.037,1.817-0.053,3.641,0.006,5.483  c0.028,0.918,0.08,1.836,0.157,2.742c0.076,0.903,0.181,1.805,0.369,2.63c0.093,0.41,0.206,0.803,0.343,1.135  c0.136,0.329,0.303,0.586,0.428,0.701c0.132,0.105,0.167,0.133,0.379,0.15c0.201,0.02,0.548-0.037,0.918-0.143  c0.76-0.222,1.626-0.611,2.51-1.002c0.89-0.394,1.811-0.808,2.779-1.158c1.928-0.708,4.053-1.207,6.225-1.181  c2.018,0.047,4.04,0.218,6.033,0.625c1.999,0.396,3.936,1.107,5.709,2.001c1.771,0.903,3.387,1.971,4.892,3.088  c3.014,2.236,5.612,4.672,8.064,6.973c2.445,2.3,4.692,4.566,6.74,6.61c0.982,0.928,2.104,1.723,3.188,2.385  c1.094,0.662,2.2,1.178,3.279,1.534c2.161,0.733,4.207,0.787,5.811,0.438c0.805-0.172,1.498-0.43,2.095-0.682  c0.587-0.267,1.074-0.537,1.451-0.783c0.188-0.126,0.354-0.236,0.497-0.332c0.138-0.103,0.253-0.191,0.346-0.262  c0.188-0.142,0.284-0.215,0.284-0.215l0.008-0.007c0.037-0.028,0.09-0.021,0.118,0.017c0.026,0.036,0.021,0.087-0.013,0.115  c0,0-0.094,0.079-0.274,0.233c-0.09,0.077-0.202,0.172-0.335,0.285c-0.138,0.109-0.304,0.228-0.487,0.365  c-0.739,0.534-1.908,1.266-3.578,1.704c-1.659,0.439-3.819,0.479-6.118-0.19c-2.293-0.66-4.732-1.929-6.954-3.86  c-2.136-1.997-4.431-4.169-6.911-6.413c-2.486-2.233-5.129-4.575-8.077-6.715c-1.476-1.062-3.037-2.062-4.713-2.888  c-1.679-0.817-3.473-1.447-5.342-1.812c-1.869-0.371-3.792-0.526-5.721-0.562c-1.919-0.013-3.824,0.436-5.633,1.11  c-0.907,0.336-1.798,0.719-2.688,1.109c-0.893,0.386-1.782,0.79-2.733,1.064c-0.476,0.128-0.974,0.233-1.488,0.192  c-0.513-0.024-1.029-0.251-1.397-0.611c-0.37-0.362-0.614-0.812-0.802-1.268c-0.187-0.457-0.314-0.931-0.419-1.403  c-0.398-1.899-0.467-3.813-0.511-5.693c-0.033-1.882,0.011-3.74,0.074-5.565c0.101-3.645,0.154-7.171,0.046-10.513  c-0.066-3.343-0.283-6.498-0.512-9.406c-0.267-2.905-0.557-5.565-0.905-7.911c-0.336-2.346-0.689-4.383-1.024-6.052  c-0.402-2.052-0.631-3.175-1.136-3.892c-1.373-1.945-3.387-2.371-5.842-1.513C10.799,1.715,8.105,9.125,8.87,34.515  c0.731,24.271,14.15,54.462,40.674,57.09v2.86c-14.857,0.096-26.607,1.291-26.607,2.752c0,1.524,12.764,2.758,28.507,2.758  c15.744,0,28.507-1.233,28.507-2.758c0-1.461-11.748-2.656-26.606-2.752v-2.656C82.379,91.791,100.397,66.932,92.139,54.505z"
              />
            </g>
            <g
              id="SvgjsG1020"
              transform="matrix(3.0355593298890557,0,0,3.0355593298890557,-4.128360732073141,166.81873465601754)"
              fill="url(#SvgjsLinearGradient1027)"
            >
              <path d="M1.36 20 l0 -13.22 l3.36 0 l0 5.1 l5.4 0 l0 -5.1 l3.36 0 l0 13.22 l-3.36 0 l0 -5.22 l-5.4 0 l0 5.22 l-3.36 0 z M16.2 20 l0 -13.22 l3.36 0 l0 5.1 l5.4 0 l0 -5.1 l3.36 0 l0 13.22 l-3.36 0 l0 -5.22 l-5.4 0 l0 5.22 l-3.36 0 z M35 20 l0 -13.22 l8.64 0 l0 2.86 l-5.28 0 l0 2.28 l4.44 0 l0 2.86 l-4.44 0 l0 5.22 l-3.36 0 z M54.08 10.66 l0 9.34 l-2.82 0 l-0.08 -1.46 c-0.26 0.56 -1.04 1.74 -3.1 1.74 c-1.38 0 -2.98 -0.56 -2.98 -3.48 l0 -6.14 l3.12 0 l0 5.34 c0 1.1 0.26 1.64 0.9 1.64 c1.08 0 1.66 -1.82 1.84 -2.5 l0 -4.48 l3.12 0 z M56.160000000000004 20 l0 -9.34 l2.9 0 l0 1.6 c0.44 -1 1.22 -1.88 2.48 -1.88 c1.48 0 1.94 0.98 1.94 0.98 l-1.86 2.68 s-0.24 -0.66 -0.92 -0.66 c-0.72 0 -1.1 0.94 -1.42 1.92 l0 4.7 l-3.12 0 z M64.4 20 l0 -9.34 l2.9 0 l0 1.48 c0.24 -0.56 1.02 -1.76 3.1 -1.76 c1.38 0 2.98 0.56 2.98 3.48 l0 6.14 l-3.12 0 l0 -5.34 c0 -1.1 -0.26 -1.64 -0.9 -1.64 c-1.12 0 -1.68 1.56 -1.84 2.16 l0 4.82 l-3.12 0 z M75.20000000000002 7.4 c0 -0.96 0.8 -1.74 1.76 -1.74 c0.98 0 1.76 0.78 1.76 1.74 s-0.78 1.76 -1.76 1.76 c-0.96 0 -1.76 -0.8 -1.76 -1.76 z M75.40000000000002 20 l0 -9.34 l3.12 0 l0 9.34 l-3.12 0 z M79.96000000000002 13 l0 -2.34 l1.18 0 l0.18 -2.56 l2.9 0 l0 2.56 l2.56 0 l0 2.34 l-2.56 0 l0 3.96 c0 0.46 0.14 0.74 0.54 0.74 c0.5 0 0.6 -0.56 0.64 -1.12 l2.28 0.8 c-0.4 1.58 -1.02 2.82 -3.3 2.82 c-2.48 0 -3.28 -1.58 -3.28 -3.24 l0 -3.96 l-1.14 0 z M97.60000000000001 10.66 l0 9.34 l-2.82 0 l-0.08 -1.46 c-0.26 0.56 -1.04 1.74 -3.1 1.74 c-1.38 0 -2.98 -0.56 -2.98 -3.48 l0 -6.14 l3.12 0 l0 5.34 c0 1.1 0.26 1.64 0.9 1.64 c1.08 0 1.66 -1.82 1.84 -2.5 l0 -4.48 l3.12 0 z M99.68000000000002 20 l0 -9.34 l2.9 0 l0 1.6 c0.44 -1 1.22 -1.88 2.48 -1.88 c1.48 0 1.94 0.98 1.94 0.98 l-1.86 2.68 s-0.24 -0.66 -0.92 -0.66 c-0.72 0 -1.1 0.94 -1.42 1.92 l0 4.7 l-3.12 0 z M116.66000000000001 16.04 l-5.92 0 c0.08 1.34 0.46 1.92 1.76 1.92 c0.8 0 1.28 -0.22 1.42 -0.94 l2.74 0.48 c-0.52 1.74 -1.76 2.78 -4.26 2.78 c-3.12 0 -4.92 -1.62 -4.92 -4.84 c0 -2.6 1.16 -5.06 4.78 -5.06 c2.94 0 4.4 1.62 4.4 4.64 l0 1.02 z M112.14000000000001 12.6 c-0.76 0 -1.2 0.36 -1.36 1.54 l2.6 0 l0 -0.02 c0 -1.1 -0.42 -1.52 -1.24 -1.52 z" />
            </g>
          </svg>
        </Link>

        <div className={styles.navigation}>
          <HashLink className={styles.text} to="/#about">
            About
          </HashLink>
        </div>

        <div className={styles.navigation}>
          <HashLink className={styles.text} to="/#catalog">
            Catalog
          </HashLink>
        </div>

        <div className={styles.navigation}>
          <HashLink className={styles.text} to="/#productOfTheMonth">
            Best Choice
          </HashLink>
        </div>

        <div className={styles.navigation}>
          <HashLink className={styles.text} to="/#contacts">
            Contacts
          </HashLink>
        </div>

        <div className={styles.links}>
          {!isUserAuthorized && (
            <div>
              <Link to={ROUTE_PATH.registration}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
              </Link>
            </div>
          )}
          {!isUserAuthorized && (
            <div>
              <Link to={ROUTE_PATH.login}>
                <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.icon} />
              </Link>
            </div>
          )}
          {isUserAuthorized && (
            <div>
              <Link to={ROUTE_PATH.basket}>
                <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
              </Link>
            </div>
          )}
          {isUserAuthorized && (
            <div>
              <button type="button" aria-label="Logout" onKeyDown={() => {}} onClick={handleLogout}>
                <FontAwesomeIcon icon={faDoorOpen} className={styles.icon} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
