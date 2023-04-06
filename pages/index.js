import styles from '@/styles/Home.module.css';
import utilStyles from '@/styles/utils.module.css';
import ExternalLink from '@/components/externalLink.js';
import Button from '@/components/button.js';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return(
    <>
      <section className={`${styles.welcomeScreen} ${styles.section}`}>
        <h1 className={`${utilStyles.subtitle} ${styles.title}`}>WE MAKE <span className={utilStyles.hlText}>LANGUAGE LEARNING</span> FUN</h1>
        <div className={styles.titleButtons}>
          <Button classes={utilStyles.whiteText} hl={true} clickHandler={() => router.push("/sign-up")}>Sign Up</Button>
          <Button classes={utilStyles.whiteText}>Learn More</Button>
        </div>
      </section>
      <section className={styles.section}>
        <h2>Our Values</h2>
        <div className={styles.values}>
          <div className={styles.refoldValue}>
            <h3>The Refold philosophy</h3>
            <p>The Refold philosophy for learning languages suggests that you should learn to comprehend input before you learn to produce output. Langlearn is built with this idea in mind.</p>
            <Button classes={utilStyles.whiteText} clickHandler={() => window.open('https://google.com/', '_blank')}>Read more</Button>
          </div>
        </div>
      </section>
    </>
  )
}
