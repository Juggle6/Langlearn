import styles from '@/styles/Home.module.css';
import utilStyles from '@/styles/utils.module.css';

export default function Home() {
  return(
    <>
      <header className={styles.header}>
        <nav className={styles.headerGroup}>
          <a>Philosophy</a>
          <a>About Us</a>
        </nav>
        <nav className={styles.headerGroup}>
          <a>Sign Up</a>
          <a>Log In</a>
        </nav>
      </header>
      <section className={styles.welcomeScreen}>
        <h1 className={`${utilStyles.subtitle} ${styles.title}`}>WE MAKE <span className={utilStyles.hlText}>LANGUAGE LEARNING</span> FUN</h1>
        <div className={styles.titleButtons}>
          <button className={`${utilStyles.button} ${utilStyles.hlButton}`}>Sign Up</button>
          <button className={utilStyles.button}>Learn More</button>
        </div>
      </section>
    </>
  )
}
