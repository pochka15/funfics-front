import React from 'react';
import SelectSearch from "react-select-search";
import {searchFunficsByQuery} from "../../api/funficsApi";
import {useHistory} from "react-router-dom";


/**
 * Searchbar component which searches for funfics.
 * @returns {JSX.Element}
 * @constructor
 */
function FunficsSelectSearch() {
  const history = useHistory();

  function searchFunfics(query) {
    return new Promise((resolve, reject) => {
      if (query.length === 0)
        resolve([])
      else
        searchFunficsByQuery(query,
          funfics => resolve(funfics.map(f => ({name: f.name, value: f.id}))),
          reject)
    });
  }

  return (
    <SelectSearch
      options={[]}
      onChange={(id) => history.push(`/read/${id}`)}
      getOptions={searchFunfics}
      search
      placeholder="Search funfic"
    />
  );
}

export default FunficsSelectSearch;