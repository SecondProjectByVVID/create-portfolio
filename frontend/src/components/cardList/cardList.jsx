import styles from './cardList.module.scss';
import CardUserPortfolio from './../cardUserPortfolio/cardUserPortfolio';
import { useGetAllPortfolioQuery } from '../../store/portfolio/PortfolioSlice';
import Skeleton from './../../UI/skeleton/Skeleton';
const CardList = () => {
  const { data: allPortfolio, isLoading, isError } = useGetAllPortfolioQuery();
  if (isLoading || isError) {
    return (
      <div className={styles.card__list}>
        <Skeleton size={{ width: '80%', height: '360px' }} />
        <Skeleton size={{ width: '80%', height: '360px' }} />
      </div>
    );
  }
  console.log(allPortfolio);
  return (
    <div className={styles.card__list}>
      {allPortfolio.map((item) => (
        <CardUserPortfolio
          key={item.id}
          portfolioId={item.id}
          title={item.title}
          description={item.description}
          id={item.user}
        />
      ))}
    </div>
  );
};

export default CardList;
