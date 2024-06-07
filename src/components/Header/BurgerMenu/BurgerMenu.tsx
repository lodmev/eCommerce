import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faCartShopping,
  faLightbulb,
  faDatabase,
  faStore,
  faAddressBook,
  faUser,
  faArrowRightFromBracket,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { HashLink } from 'react-router-hash-link';
import styles from './BurgerMenu.module.css';
import { ROUTE_PATH } from '../../../utils/globalVariables';
import { enumToArray } from '../../../utils/functions';
import { useStoreDispatch, useStoreSelector } from '../../../hooks/userRedux';
import { setUserLogout } from '../../../store/slices/userSlice';
import { resetCartState } from '../../../store/slices/basketSlice';

enum NavigationPath {
  About = 'about',
  Catalog = 'catalog',
  ProductOfTheMonth = 'productOfTheMonth',
  Contacts = 'contacts',
  Registration = 'registration',
  Login = 'login',
  Logout = 'logout',
  Basket = 'basket',
  userProfile = 'user-profile',
}

const NavigationPathToTitle = new Map<NavigationPath, string>([
  [NavigationPath.About, 'About'],
  [NavigationPath.Catalog, 'Catalog'],
  [NavigationPath.ProductOfTheMonth, 'Product Of The Month'],
  [NavigationPath.Contacts, 'Contacts'],
  [NavigationPath.Login, 'Login'],
  [NavigationPath.Logout, 'Logout'],
  [NavigationPath.Registration, 'Registration'],
  [NavigationPath.Basket, 'Basket'],
  [NavigationPath.userProfile, 'Profile'],
]);

const NavigationPathToIcon = new Map<NavigationPath, IconDefinition>([
  [NavigationPath.About, faLightbulb],
  [NavigationPath.Catalog, faDatabase],
  [NavigationPath.ProductOfTheMonth, faStore],
  [NavigationPath.Contacts, faAddressBook],
  [NavigationPath.Login, faArrowRightToBracket],
  [NavigationPath.Logout, faArrowRightFromBracket],
  [NavigationPath.Registration, faUser],
  [NavigationPath.Basket, faCartShopping],
  [NavigationPath.userProfile, faIdCard],
]);

const NavigationPathToPath = new Map<NavigationPath, string>([
  [NavigationPath.About, '/#about'],
  [NavigationPath.Catalog, '/products'],
  [NavigationPath.ProductOfTheMonth, '/#productOfTheMonth'],
  [NavigationPath.Contacts, '/#contacts'],
  [NavigationPath.Login, ROUTE_PATH.login],
  [NavigationPath.Logout, ROUTE_PATH.login],
  [NavigationPath.Registration, ROUTE_PATH.registration],
  [NavigationPath.Basket, ROUTE_PATH.basket],
  [NavigationPath.userProfile, ROUTE_PATH.userProfile],
]);

const NavigationPathToAction = new Map([
  [NavigationPath.Logout, [setUserLogout(), resetCartState()]],
]);

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isUserAuthorized } = useStoreSelector((state) => state.userData);
  const dispatch = useStoreDispatch();
  const navigationPaths = enumToArray(NavigationPath).filter((title: string) => {
    if ([NavigationPath.Login, NavigationPath.Registration].includes(title as NavigationPath)) {
      return !isUserAuthorized;
    }
    if ([NavigationPath.Logout, NavigationPath.userProfile].includes(title as NavigationPath)) {
      return isUserAuthorized;
    }
    return true;
  });

  function handleMenuClick(): void {
    setIsOpen(!isOpen);
  }

  function handleNavigationClick(navigationPath: NavigationPath): void {
    const actions = NavigationPathToAction.get(navigationPath);
    if (actions) {
      actions.forEach((action) => {
        dispatch(action);
      });
    }
  }

  return (
    <div className={styles['burger-menu']} onClick={handleMenuClick} aria-hidden="true">
      <div className={styles['burger-button']}>
        <div className={styles['burger-button__body']}>
          <span className={styles['burger-button__line']} />
          <span className={styles['burger-button__line']} />
        </div>

        {isOpen && <div className={styles.background} />}

        <nav className={`${styles['nav-menu']} ${isOpen ? '' : styles.hidden}`}>
          <ul className={styles['nav-menu-items']}>
            {navigationPaths.map((path: string, index: number) => {
              const navigationPath = path as NavigationPath;
              const key = index;
              return (
                <HashLink
                  to={NavigationPathToPath.get(navigationPath)!}
                  className={styles['nav-menu-link']}
                  onClick={() => handleNavigationClick(navigationPath)}
                  key={key}
                >
                  <FontAwesomeIcon
                    icon={NavigationPathToIcon.get(navigationPath)!}
                    className={styles.icon}
                  />
                  <p className={styles.text}>{NavigationPathToTitle.get(navigationPath)}</p>
                </HashLink>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
