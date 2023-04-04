import {useState} from 'react';
import styles from '@/styles/auth.module.css';
import utilStyles from '@/styles/utils.module.css';
import Button from '@/components/button.js';
import {useRouter} from 'next/router';
import {signIn} from 'next-auth/react';

export default function SignUpPage() {
  const [form, setForm] = useState({username: '', email: '', password: ''})
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(form)
    })

    if (!response.ok) {
      console.error("Something happened while registering your credentials.");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const router = useRouter();

  function handleLogIn(e) {
    e.preventDefault();
    e.stopPropagation();
    router.push("/api/auth/signin")
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
        <div className={styles.submitContent}>
          <button className={`${utilStyles.button} ${utilStyles.hlButton}`} type="submit" onClick={handleSubmit}>Sign Up</button>
          <hr className={styles.divider}/>
          <button className={`${utilStyles.button} ${utilStyles.blackText}`} onClick={handleLogIn}>Log In</button>
        </div>
      </form>
    </div>
  )
}
