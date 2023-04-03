import utilStyles from '../styles/utils.module.css';

export default function Button({ text, href, handlerFunction, type }) {
  function openNewTab(e) {
    e.preventDefault()
    e.stopPropagation()
    window.open(href, '_blank', 'noreferrer');
  }

  return <button className={type === 'hl' 
    ? `${utilStyles.button} ${utilStyles.hlButton}`
    : utilStyles.button} onClick={handlerFunction ? handlerFunction : href ? openNewTab : null} type="button">{text}</button>
}
