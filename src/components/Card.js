function Card({result}) {
  return (
    <a className="card" target="_blank" rel="noreferrer" href={"https://store.steampowered.com/app/" + result.steamAppID}>
      <img className="thumbnail" alt="thumbnail" src={result.thumb} />
      <div className="details">
        <p className="title">{result.title}</p>
        <div className="price-info">
          <p className="discount center">{Math.floor(result.savings)}%</p>
          <div className="prices">
            <p><small><del>€{result.normalPrice}</del></small></p>
            <p>€{result.salePrice}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default Card;