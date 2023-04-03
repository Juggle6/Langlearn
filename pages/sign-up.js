import {useState} from 'react';
import styles from '@/styles/auth.module.css';
import utilStyles from '@/styles/utils.module.css';

export default function SignUpPage() {
  const [form, setForm] = useState({username: '', email: '', password: ''})
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault()
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
        <div className={styles.content}>
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
          <div className={styles.submitButtonContainer}>
            <button className={`${utilStyles.button} ${utilStyles.hlButton}`} type="submit" onClick={handleSubmit}>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  )
}
