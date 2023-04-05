import utilStyles from '@/styles/utils.module.css';
import styles from '@/styles/header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.profileNav}>
        <Link href="/sign-up" className={utilStyles.navBarSignUp}>Sign Up</Link>
        <Link href="/login" className={utilStyles.navBarLink}>Log In</Link>
      </div>
    </div>
  )
}
