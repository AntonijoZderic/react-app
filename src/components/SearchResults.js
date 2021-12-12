import Card from './Card'

function SearchResults({apiData, searchTerm, sortBy, filteringPrice}) {
  var searchResults = apiData;

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
      searchResults.map((result, index) => (
        <Card result={result} key={index} />
      ))
      : <p className="align-wrap">No results found</p>}
    </div>
  );
}

export default SearchResults;