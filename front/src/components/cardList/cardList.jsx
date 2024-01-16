import styles from './cardList.module.scss';
import CardUserPortfolio from './../cardUserPortfolio/cardUserPortfolio';
const CardList = () => {
  return (
    <div className={styles.card__list}>
      <CardUserPortfolio />
      <CardUserPortfolio />
      <CardUserPortfolio />
    </div>
  );
};

export default CardList;
