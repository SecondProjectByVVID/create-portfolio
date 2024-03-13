import styles from "./cardList.module.scss";
import CardUserPortfolio from "./../cardUserPortfolio/cardUserPortfolio";
import { useGetAllPortfolioQuery } from "../../store/portfolio/PortfolioSlice";
import Skeleton from "./../../UI/skeleton/Skeleton";
import { useFetchInfoProfileQuery } from "../../store/profile/ProfileSlice";
import { localStorageService } from "../../service/localStorage.service";
import { useSearch } from "../../hooks/useSearch";
const CardList = () => {
  const { data: allPortfolio, isLoading, isError } = useGetAllPortfolioQuery();
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    refetch,
  } = useFetchInfoProfileQuery(localStorageService.getUserId());
  const { searchCards } = useSearch();
  if (isLoading || isError || profileLoading || profileError) {
    return (
      <div className={styles.card__list}>
        <Skeleton size={{ width: "80%", height: "360px" }} />
        <Skeleton size={{ width: "80%", height: "360px" }} />
      </div>
    );
  }
  return (
    <div className={styles.card__list}>
      {!searchCards.length > 0
        ? allPortfolio.map((item) => (
            <CardUserPortfolio
              key={item.id}
              userImage={item.user_image}
              favorites={profile[0].portfolio_favorites}
              cb={refetch}
              userId={localStorageService.getUserId()}
              {...item}
            />
          ))
        : searchCards.map((item) => (
            <CardUserPortfolio
              key={item.id}
              userImage={item.user_image}
              favorites={profile[0].portfolio_favorites}
              cb={refetch}
              userId={localStorageService.getUserId()}
              {...item}
            />
          ))}
    </div>
  );
};

export default CardList;
