export default function Layout() {
  return (
    <div className={styles.header}>
      <div className={styles.profileNav}>
        <Link href="/sign-up" className={utilStyles.navBarSignUp}>Sign Up</Link>
        <Link href="/login" className={utilStyles.navBarLink}>Log In</Link>
      </div>
    </div>
  )
}
