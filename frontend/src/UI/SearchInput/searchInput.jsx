import { getIconKey } from '../../helpers/getImageKey';
import './searchInput.scss';
const SearchInput = ({ searchHandle, searchText, searchSubmit }) => {
  const keyEvent = (event) => {
    console.log(event.key);
    if(event.key === 'Enter') searchSubmit()
  }
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="поиск портфолио"
        onChange={searchHandle}
        value={searchText}
        onKeyPress={keyEvent}
      />
      <div className="search__block" onClick={searchSubmit}>
        <img
          className="search__icon"
          src={getIconKey('SearchIcon')}
          alt="search icon"
        />
      </div>
    </div>
  );
};

export default SearchInput;
