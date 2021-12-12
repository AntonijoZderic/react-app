import { useState, useEffect } from 'react'
import Menu from './Menu'
import menuIcon from '../icons/menu.png'

function Menus({getSortBy, getFilteringPrice}) {
  const [showMenus, setShowMenus] = useState(false);
  const [matches , setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
  }, []);

  useEffect(() => {
    setShowMenus(false);
    document.body.style.overflow = "visible";
  }, [matches]);

  const toggleMenus = () => {
    !showMenus ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
    setShowMenus(!showMenus);
  };

  const getMenuOption = (o) => {
    if (isNaN(o)) {
      getSortBy(o);
    } else {
      getFilteringPrice(o);
    }
  };

  return (
    <>
      <div className="icon-text-container" onClick={() => toggleMenus()}>
        <div className="icon-text">
          <img src={menuIcon} alt="menu icon" />
          <p>SORT/FILTER</p>
        </div>
      </div>
      <div className="overlay" style={{display : showMenus && "inline"}} onClick={() => toggleMenus()}></div>
      <div className="menus" style={{display : showMenus && "inline"}}>
        <Menu type="SORT" getMenuOption={(o) => getMenuOption(o)} />
        <Menu type="FILTER" getMenuOption={(o) => getMenuOption(o)} />
      </div>
    </>
  );
}

export default Menus;