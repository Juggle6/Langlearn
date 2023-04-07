import styles from '@/styles/centeredContainer.module.css';

export default function CenteredContainer({ children, center }) {
  return <div className={`${styles.centeredContainer} ${center ? (center === 'horizontal' ? styles.centerHorizontal : (center === 'vertical' ? styles.centerVertical : null)) : styles.centerBoth}`}>{children}</div>
}
