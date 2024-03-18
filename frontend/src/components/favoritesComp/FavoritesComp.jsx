import styles from './FavoritesComp.module.scss'
import CardUserPortfolio from "./../cardUserPortfolio/cardUserPortfolio";
import { useGetAllFavoritesQuery } from "../../store/portfolio/PortfolioSlice";
import Skeleton from "./../../UI/skeleton/Skeleton";
import { useFetchInfoProfileQuery } from "../../store/profile/ProfileSlice";
import { localStorageService } from "../../service/localStorage.service";
const FavoritesComp = () => {
  const { data: allFavorites, isLoading, isError } = useGetAllFavoritesQuery(localStorageService.getUserId());
  const {
    data: profile,
    isLoading: profileLoading,
    refetch,
  } = useFetchInfoProfileQuery(localStorageService.getUserId());
  const updateFavoritesProject = (id) => {
    const favorites = profile[0].portfolio_favorites
    if (favorites.includes(id)) {
      return favorites.filter((item) => item !== id)
    } else {
      const newArr = [...favorites]
      newArr.push(id);
      return newArr;
    }
  }
  const isFavorites = (id) => {
    const res = profile[0].portfolio_favorites?.find((favorite) => favorite === id)
    return res
  }
  if (isLoading || isError) {
    return (
      <div className={styles.favorites__container}>
      <div className={styles.favorites__list}>
        <Skeleton size={{ width: "80%", height: "360px" }} />
        <br />
        <Skeleton size={{ width: "80%", height: "360px" }} />
      </div>
      </div>
    );
  }
  return <div className={styles.favorites__container}>
    <div className={styles.favorites__list}>
      {
        allFavorites.map((item) => (
            <CardUserPortfolio
              key={item.id}
              userImage={item.user_image}
              favorites={!profileLoading && localStorageService.getUserId() ? isFavorites(item.id) : false}
              cb={refetch}
            userId={localStorageService.getUserId()}
          updateFavoritesProject={updateFavoritesProject}
              {...item}
            />
          ))
      }
    </div>
 </div>
}

export default FavoritesComp