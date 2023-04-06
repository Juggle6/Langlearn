import {useState} from 'react';
import styles from '@/styles/auth.module.css';
import utilStyles from '@/styles/utils.module.css';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import Button from '@/components/button.js';
import {useRouter} from 'next/router';

export default function Login() {
  const [form, setForm] = useState({username: '', password: ''})
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault()
    signIn("credentials", { redirect: false, username: form.username, password: form.password })
      .then(({ ok, error }) => {
        if (ok) {
          return router.push('/dashboard')
        } 

        if (error === 'CredentialsSignin') {
          setError(`Your credentials don't match.`)
        }
      })
  }

  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.signUpForm}>
        <div className={styles.heading}>
          <h1>Log in</h1>
        </div>
        <div className={styles.textInput}>
          <input name="username" className={styles.authTextInput} type="text" placeholder='Email/Username' onChange={handleChange} value={form.username}/>
        </div>
        <div className={styles.textInput}>
          <input name="password" className={styles.authTextInput} type={showPassword ? "text" : "password"} placeholder='Password' onChange={handleChange} value={form.password}/>
        </div>
        {error ? (
          <div className={styles.errorBox}>
            <p>{error}</p>
          </div>
        ) : null}
        <div className={styles.submitContent}>
          <Button clickHandler={handleSubmit} classes={utilStyles.whiteText} hl={true}>Log In</Button>
          <div className={styles.dividerDiv}>
            <div className={styles.divider}/>
            <span>or</span>
            <div className={styles.divider}/>
          </div>
          <Button clickHandler={() => router.push('/sign-up')}>Sign Up</Button>
        </div>
      </form>
    </div>
  )
}
