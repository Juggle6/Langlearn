import styles from '@/styles/Home.module.css';
import utilStyles from '@/styles/utils.module.css';
import ExternalLink from '@/components/externalLink.js';
import Button from '@/components/button.js';
import Link from 'next/link';

export default function Home() {
  return(
    <>
      <header className={styles.header}>
        <nav className={styles.headerGroup}>
          <a>Philosophy</a>
          <a>About Us</a>
        </nav>
        <nav className={styles.headerGroup}>
          <Link href="/sign-up" className={utilStyles.navBarSignUp}>Sign Up</Link>
          <Link href="/login" className={utilStyles.navBarLink}>Log In</Link>
        </nav>
      </header>
      <section className={`${styles.welcomeScreen} ${styles.section}`}>
        <h1 className={`${utilStyles.subtitle} ${styles.title}`}>WE MAKE <span className={utilStyles.hlText}>LANGUAGE LEARNING</span> FUN</h1>
        <div className={styles.titleButtons}>
          <Link href="/sign-up" className={styles.signUpLink}>
            <button className={`${utilStyles.button} ${utilStyles.hlButton}`}>Sign Up</button>
          </Link>
          <button className={utilStyles.button}>Learn More</button>
        </div>
      </section>
      <section className={styles.section}>
        <h2>Our Values</h2>
        <div className={styles.values}>
          <div className={styles.refoldValue}>
            <h3>The Refold philosophy</h3>
            <p>The Refold philosophy for learning languages suggests that you should learn to comprehend input before you learn to produce output. Langlearn is built with this idea in mind.</p>
            <a href="https://google.com">
              <button className={utilStyles.button}>Read More</button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
