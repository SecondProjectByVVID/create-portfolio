import SearchInput from './../../UI/SearchInput/searchInput';
import { getIconKey } from '../../helpers/getImageKey';

import './options.scss';
import { useSearch } from './../../hooks/useSearch';
const Options = () => {
  const { searchText, searchHandle, searchSubmit } = useSearch();
  return (
    <>
      <div className="options__inner">
        <SearchInput
          searchHandle={searchHandle}
          searchText={searchText}
          searchSubmit={searchSubmit}
        />
        <img src={getIconKey('SortIcon')} alt="" className="sort-icon" />
      </div>
    </>
  );
};

export default Options;
