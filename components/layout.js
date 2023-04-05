import Header from './header.js';
import styles from '@/styles/layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.content}>{children}</main>
    </>
  )
}
