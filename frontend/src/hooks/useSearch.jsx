import React, { useContext, useState } from "react";
import ConfigApi from "./../config/config.request.json";
import axios from "axios";

const SearchContext = React.createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [searchCards, setSearchCards] = useState([]);
  const searchHandle = ({ target }) => {
    console.log(target.value);
    setSearchText(target.value);
  };

  const searchSubmit = async () => {
    const response = await axios.get(
      ConfigApi.url + ConfigApi.search + searchText
    );
    console.log(response.data);
    setSearchCards(response.data);
  };
  const value = {
    searchText,
    searchHandle,
    searchSubmit,
    searchCards,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
export default SearchProvider;
