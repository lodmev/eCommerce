import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import styles from './Footer.module.css';
import github from '../../assets/github.png';
import rsschool from '../../assets/rsschool.png';

export default function Footer() {
  return (
    <footer>
      <div className={styles.container} id="contacts">
        <div className={styles.info}>
          <div className={styles.github}>
            <img className={styles.image} src={github} alt="github" />
            <p>
              <a className={styles.link} href="https://github.com/lodmev">
                DmitryLovyagin
              </a>
            </p>
          </div>
          <div className={styles.telephone}>
            <a className={styles.link} href="tel:+16035550123">
              +1(603)555-0123
            </a>
            <FontAwesomeIcon className={styles.image} icon={faMobileScreenButton} />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.github}>
            <img className={styles.image} src={github} alt="github" />
            <p>
              <a className={styles.link} href="https://github.com/AndyGuit">
                AndriiDmytryk
              </a>
            </p>
          </div>

          <div className={styles.telephone}>
            <a
              className={styles.link}
              href="https://maps.app.goo.gl/CedoyPirLy5drTNJ7"
              target="_blank"
              rel="noreferrer"
            >
              Our address on map
            </a>
            <FontAwesomeIcon className={styles.image} icon={faLocationDot} />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.github}>
            <img className={styles.image} src={github} alt="github" />
            <p>
              <a className={styles.link} href="https://github.com/VictoriaGorobets">
                VictoriaGorobets
              </a>
            </p>
          </div>

          <div className={styles.telephone}>
            <a
              className={styles.link}
              href="https://github.com/rolling-scopes-school/tasks/tree/master/tasks/eCommerce-Application"
              target="_blank"
              rel="noreferrer"
            >
              RSSchool
            </a>
            <img className={styles.image} src={rsschool} alt="rsschool" />
          </div>
        </div>
      </div>
    </footer>
  );
}
