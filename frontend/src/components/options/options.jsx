import SearchInput from './../../UI/SearchInput/searchInput';
import { getIconKey } from '../../helpers/getImageKey';

import './options.scss';
const Options = () => {
  return (
    <>
      <div className="options__inner">
        <SearchInput />
        <img src={getIconKey('SortIcon')} alt="" className="sort-icon" />
      </div>
    </>
  );
};

export default Options;
