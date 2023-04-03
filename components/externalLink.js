import styles from '@/styles/externalLink.module.css';

export default function ExternalLink({ hypertext, destination }) {
  return (
    <a href={destination} className={styles.text}>{hypertext}</a>
  )
}
