import {useState} from 'react';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import styles from '@/styles/auth.module.css';
import utilStyles from '@/styles/utils.module.css';
import Link from 'next/link';
import Button from '@/components/button.js';

export default function SignUpPage() {
  const [form, setForm] = useState({username: '', email: '', password: ''})
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault()

    const { username, email, password } = form;

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({username, email, password})
    });

    if (!response.ok) {
      const data = await response.json()
        .then((response) => {
          const error = response.error;

          if (error === 'ConflictingCredentials') {
            setError("There is already someone registered with that username or email.");
          } else if (error === 'EmptyField') {
            setError("One of the fields in your request were empty.")
          } else {
            setError("We have experienced a problem with processing your request. Please try again later.")
          }
          return;
        })
    } else {
      const newUser = response.json();

      signIn('credentials', { redirect: false, username, password })
        .then((ok, error) => {
          if (ok) {
            return router.push('/dashboard')
          }
        })
    }
    
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
          <h1>Sign Up</h1>
        </div>
        <div className={styles.textInput}>
          <input name="username" className={styles.authTextInput} type="text" placeholder='Username' onChange={handleChange} value={form.username}/>
        </div>
        <div className={styles.textInput}>
          <input name="email" className={styles.authTextInput} type="text" placeholder='Email' onChange={handleChange} value={form.email}/>
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
          <Button classes={utilStyles.whiteText} hl={true} clickHandler={handleSubmit}>Sign Up</Button>
          <div className={styles.dividerDiv}>
            <div className={styles.divider}/>
            <span>or</span>
            <div className={styles.divider}/>
          </div>
          <Button clickHandler={() => router.push('/login')}>Log In</Button>
        </div>
      </form>
    </div>
  )
}
