import styles from './FavoritesComp.module.scss'
const favoritesComp = () => {
  return <div className={styles.favorites__container}>
    <h1 className={styles.favorites__title}>Избранное</h1>
    <div className={styles.favorites__list}></div>
 </div>
}

export default favoritesComp