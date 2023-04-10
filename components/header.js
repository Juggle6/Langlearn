import utilStyles from '@/styles/utils.module.css';
import styles from '@/styles/header.module.css';
import Link from 'next/link';
import {useSession} from 'next-auth/react';

export default function Header() {
  const {data: session} = useSession();

  return (
    <header className={styles.header}>
      <nav className={styles.headerGroup}>
        <Link href="/" className={utilStyles.navBarLink}>Home</Link>
        <Link href="/dashboard" className={utilStyles.navBarLink}>Dashboard</Link>
        <Link href="/vocabulary" className={utilStyles.navBarLink}>Vocabulary</Link>
      </nav>
      <div className={styles.headerGroup}>
        {session
          ? <Link href="/profile">{session.username}</Link>
          : (
            <>
              <Link href="/sign-up" className={utilStyles.navBarLink}>Sign Up</Link>
              <Link href="/login" className={utilStyles.navBarLink}>Log In</Link>
            </>
          )
        }
      </div>
    </header>
  )
}
