function Search({getSearchTerm, searchTerm}) {
  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search..."
        onChange={(e) => getSearchTerm(e.target.value)}
        className="search-box"
      />
    </div>
  );
}

export default Search;