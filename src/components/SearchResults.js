import { useState, useEffect } from 'react'
import Card from './Card'
import Pagination from './Pagination'

function SearchResults({apiData, searchTerm, sortBy, filteringPrice}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 15;
  var searchResults = apiData;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, filteringPrice]);

  const compareSavings = (a, b) => Math.floor(b.savings)-Math.floor(a.savings);

  const comparePrice = (a, b) => a.salePrice-b.salePrice;

  const compareName = (a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  const offset = () => (currentPage - 1) * pageLimit;

  if (searchTerm !== "") {
    searchResults = apiData.filter(function (val) {
      return val.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }

  if (filteringPrice > 0) {
    if (filteringPrice === 16) {
      searchResults = searchResults.filter((r) => {
        if (r.salePrice > 15){
          return r;
        }
        return null;
      })
    } else {
      searchResults = searchResults.filter((r) => {
        if (r.salePrice <= filteringPrice){
          return r;
        }
        return null; 
      })
    }
  }

  searchResults.sort(compareName);
 
  if (sortBy === "Savings") {
    searchResults.sort(compareSavings);
  } else if (sortBy === "Price") {
    searchResults.sort(comparePrice);
  }
  
  return (
    <div className="search-results">
      {searchResults.length >= 1
      ?
      searchResults.slice(offset(), offset() + pageLimit).map((result, index) => (
        <Card result={result} key={index} />
      ))
      : <p className="align-wrap">No results found</p>}
      <Pagination currentPage={currentPage} getCurrentPage={(cp) => setCurrentPage(cp)} totalRecords={searchResults.length} pageLimit={pageLimit} />
    </div>
  );
}

export default SearchResults;