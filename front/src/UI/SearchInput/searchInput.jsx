import getIconKey from '../../helpers/getImageKey';
import './searchInput.scss';
const SearchInput = () => {
  return (
    <div className="search">
      <input className="search__input" type="text" placeholder="поиск портфолио" />
      <img className="search__icon" src={getIconKey('SearchIcon')} alt="search icon" />
    </div>
  );
};

export default SearchInput;
