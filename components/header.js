import utilStyles from '@/styles/utils.module.css';
import styles from '@/styles/header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.headerGroup}>
        <Link href="/" className={utilStyles.navBarLink}>Home</Link>
      </nav>
      <div className={styles.headerGroup}>
        <Link href="/sign-up" className={utilStyles.navBarLink}>Sign Up</Link>
        <Link href="/login" className={utilStyles.navBarLink}>Log In</Link>
      </div>
    </header>
  )
}
