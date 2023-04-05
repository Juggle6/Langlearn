import {useState} from 'react';
import styles from '@/styles/auth.module.css';
import utilStyles from '@/styles/utils.module.css';
import {useRouter} from 'next/router';
import {signIn} from 'next-auth/react';

export default function SignIn() {
  const [form, setForm] = useState({username: '', password: ''})
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault()
    signIn("credentials", { username: form.username, password: form.password });
  }

  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


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
