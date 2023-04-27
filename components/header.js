import utilStyles from '@/styles/utils.module.css';
import styles from '@/styles/header.module.css';
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/router';

function NavLink({ href, children }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href} className={`${utilStyles.navBarLink} ${isActive ? styles.active : ''}`}>{children}</Link>
  );
}

export default function Header() {
  const {data: session} = useSession();

  return (
    <header className={styles.header}>
      <nav className={styles.headerGroup}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/vocabulary">Vocabulary</NavLink>
      </nav>
      <div className={styles.headerGroup}>
        {session
          ? <NavLink href="/profile">{session.username}</NavLink>
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
