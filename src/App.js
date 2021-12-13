import { useState, useEffect } from 'react'
import './App.css';
import Menus from './components/Menus'
import Search from './components/Search'
import SearchResults from './components/SearchResults'

function App() {
  const [apiData, setApiData] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Savings");
  const [filteringPrice, setFilteringPrice] = useState(0);
  
  useEffect(() => {
    Promise.all([
      fetch(`https://www.cheapshark.com/api/1.0/deals?onSale=1&storeID=1`).then(res => res.json()),
      fetch(`https://www.cheapshark.com/api/1.0/deals?onSale=1&storeID=1&pageNumber=1`).then(res => res.json())
      ])
      .then((data) => {
        setApiData(data[0].concat(data[1]));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Search getSearchTerm={(st) => setSearchTerm(st)} searchTerm={searchTerm}/>
      {apiData &&
      <div className="align-wrap">
        <Menus getSortBy={(sb) => setSortBy(sb)} getFilteringPrice={(fp) => setFilteringPrice(fp)} />
        <SearchResults apiData={apiData} searchTerm={searchTerm} sortBy={sortBy} filteringPrice={filteringPrice} />
      </div>
      }
    </>
  );
}

export default App;

