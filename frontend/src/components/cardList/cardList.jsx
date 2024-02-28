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
          userNick={item.username}
          description={item.description}
          images={item.images}
          userImage={item.user_image}
          id={item.user}
        />
      ))}
    </div>
  );
};

export default CardList;
