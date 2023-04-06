import utilStyles from '../styles/utils.module.css';
import styles from '@/styles/button.module.css';
import { createElement, useState, useRef } from 'react';

export default function Button({ hl, classes, type, clickHandler, children }) {
  const [ripple, setRipple] = useState([]);

  async function createRipple(event) {
    // Initialize the ripple
    const rippleSpan = createElement('span', { 
      className: styles.ripple, 
      onAnimationEnd: (event) => setRipple(),
      style: { left: `${event.clientX - event.target.offsetLeft}px`, top: `${event.clientY - event.target.offsetTop}px`} 
    });

    setRipple([rippleSpan])
  };

  function handleClick(event) {
    event.preventDefault();
    createRipple(event);

    // The given function in the component parameters
    if (clickHandler) {
      clickHandler(event);
    }
  }

  return (
    <button 
        className={`${styles.button} ${hl ? styles.hlButton : null} ${classes}`}
        type={type}
        onClick={handleClick}
    >
      {ripple}
      {children}
    </button>
  )
}
