import githubIcon from '../../assets/github.png';
import styles from './TeamMemberCard.module.css';

type Props = {
  name: string;
  jobRole: string;
  imgUrl: string;
  bio: string;
  githubLink: string;
};

export default function TeamMemberCard(props: Props) {
  const { bio, githubLink, imgUrl, jobRole, name } = props;

  return (
    <article className={styles.card}>
      <img className={styles['card-avatar']} src={imgUrl} alt={name} />
      <div>
        <header className={styles.header}>
          <h2>{name}</h2>
          <h3>{jobRole}</h3>
          <a
            className={styles['card-github-link']}
            href={githubLink}
            target="_blank"
            rel="noreferrer"
          >
            <img className={styles['github-icon']} src={githubIcon} alt="github icon" />
            Github
          </a>
        </header>
        <main>{bio}</main>
      </div>
    </article>
  );
}
