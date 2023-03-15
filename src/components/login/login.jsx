import styles from './login.module.css';
import React, { useState } from 'react';

export default function Login() {
    const [fields, setFields] = useState({username: "", password: "", rememberMe: false});
    const [passwordType, setPasswordType] = useState("password");

    function handleChange(event) {
        setFields({...fields, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value});
    };

    function handleButtonClick() {
        event.preventDefault();
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    return (
        <div className={styles.loginScreen}>
            <form className={styles.loginForm}>
                <div className={styles.header}>
                    <h1>Login</h1>
                </div>
                <div className={styles.userNameDiv}>
                    <h2>Username</h2>
                    <input name="username" type="text" className={styles.textBox} placeholder="Enter a username" onChange={handleChange} value={fields.username}/>
                </div>
                <div className={styles.passwordDiv}>
                    <h2>Password</h2>
                    <div className={styles.passwordInputBox}>
                        <input name="password" type={passwordType} className={styles.textBox} placeholder="Enter a password" onChange={handleChange} value={fields.password}/>
                        <button onClick={handleButtonClick} className={styles.showPassword}>
                            {passwordType === "password" ? <img src="eye-slash.svg" /> : <img src="eye.svg" />}
                        </button>
                    </div>
                </div>
                <div className={styles.rememberMe}>
                    <h2>Remember Me</h2>
                    <input name="rememberMe" type="checkbox" className={styles.checkBox} onChange={handleChange} value={fields.rememberMe}/>
                </div>
                <div className={styles.submitDiv}>
                    <input type="submit" className={styles.submit} value="Login" />
                </div>
            </form>
        </div>
    );
};
