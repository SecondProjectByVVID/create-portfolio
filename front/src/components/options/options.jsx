import SearchInput from './../../ui/SearchInput/searchInput';
import { getIconKey } from '../../helpers/getImageKey';

import './options.scss';
const Options = () => {
  return (
    <>
      <div className="options__inner">
        <SearchInput />
        <div className="options__bg-img">
          <img src={getIconKey('SortIcon')} alt="sort icon" className="sort-icon" />
        </div>
      </div>
    </>
  );
};

export default Options;
