import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import styles from './About.module.css';
import avatarDmitry from '../../assets/avatar-dmitriy.jpg';
import avatarAndrii from '../../assets/avatar-andrii.jpeg';
import avatarVictoria from '../../assets/avatar-victoria.jpeg';

export default function About() {
  return (
    <>
      <h1 className={styles.heading}>Great Job Team</h1>
      <p className={styles['collaboration-text']}>
        Our development team exemplifies the power of collaboration, working seamlessly to transform
        ideas into a successful product. We communicated primarily through Discord group chats,
        ensuring everyone stayed aligned and any issues were promptly addressed. Each team member
        had clearly defined roles and responsibilities, maximizing efficiency by leveraging
        individual strengths. Adopting Agile practices, we conducted regular sprint planning and
        reviews, maintaining flexibility and delivering high-quality iterations. Using GitHub for
        version control enabled smooth code collaboration and peer reviews. A culture of mutual
        support and respect fostered a positive environment where team members assisted each other
        and shared knowledge. These collaborative efforts led to a robust, innovative product that
        we are all proud of, demonstrating the synergy and dedication of each team member.
      </p>
      <div className={styles['team-members-cards']}>
        <TeamMemberCard
          imgUrl={avatarDmitry}
          jobRole="Team Lead / Developer"
          name="Dmitry Lovyagin"
          bio="Dmitriy is our dedicated Team Lead and a talented developer, playing a crucial role in steering the project to success. With a strong background in software development and leadership, Dmitriy ensured the team's efforts were aligned and productive. He managed the GitHub repository, set up the pull request template, and configured essential tools like Vite for bundling, ESLint for code quality, and Husky for pre-commit hooks. Dmitriy also integrated Jest for testing, ensuring our codebase remained robust and reliable. Furthermore, he led the setup of the CommerceTools project and API client, establishing the foundation for seamless integration with external services and enhancing the project's functionality. His multifaceted contributions were instrumental in maintaining a streamlined development process and delivering a high-quality product."
          githubLink="https://github.com/lodmev"
        />
        <TeamMemberCard
          imgUrl={avatarAndrii}
          jobRole="Developer"
          name="Andrii Dmytryk"
          bio="Andrii is a skilled Developer who has made significant contributions to our project's success. With expertise in frontend development and a keen eye for detail, Andrii played a pivotal role in configuring our development environment for optimal efficiency. He spearheaded the setup of the Vite bundler, ensuring fast and reliable bundling of our assets. Andrii's proficiency in React was evident in his contributions to developing key features, including the login page, register page, user profile page, and the About page. He also implemented React Router for seamless navigation within the application, enhancing the overall user experience. Andrii's meticulous approach to TypeScript and ESLint configuration ensured code consistency and maintainability throughout the project. His dedication to refining the folder structure optimized code organization and scalability. Through his diverse contributions, Andrii has been instrumental in shaping our project and delivering a polished and user-friendly product."
          githubLink="https://github.com/AndyGuit"
        />
        <TeamMemberCard
          imgUrl={avatarVictoria}
          jobRole="App Design / Developer"
          name="Victoria Gorobets"
          bio="Victoria is a versatile Developer and Designer who has left her mark on every aspect of our project. With a keen eye for aesthetics and functionality, Victoria led the design efforts, ensuring our application not only looked great but also provided an intuitive user experience. She collaborated closely with the team, utilizing tools like Trello to effectively manage tasks and keep everyone organized. Victoria's attention to detail extended to the project's documentation, where she crafted a comprehensive README file that guided users and contributors alike. In addition to her design prowess, Victoria played a crucial role in curating and managing the products data, ensuring accuracy and consistency across the platform. She implemented key UI components such as the header, navigation, footer, and 404 page, providing a cohesive and seamless user interface. Victoria's contributions were not limited to the frontend; she also played a significant role in developing core pages like the main page, detailed product page, and catalog page. Her dedication to both design and development has been instrumental in shaping our project into a polished and user-friendly application."
          githubLink="https://github.com/VictoriaGorobets"
        />
      </div>
    </>
  );
}
