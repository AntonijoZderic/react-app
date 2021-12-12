import { useState, useRef } from 'react'
import checkMarkIcon from '../icons/check_mark.png'
import expandMoreIcon from '../icons/expand_more.png'
import expandLessIcon from '../icons/expand_less.png'

function Menu({type, getMenuOption}) {
  const [showMenu, setShowMenu] = useState(true);
  const selectedOption = useRef(type === "SORT" && 0);

  function selectOption(o){
    selectedOption.current = o;
  }

  const sortingOptions = ["Savings", "Price", "Name"];
  const filteringOptions = [{text: "Under €5", price: 5}, {text: "Under €10", price: 10}, {text: "Under €15", price: 15}, {text: "Over €15", price: 16}];
  const options = type === "SORT" ? sortingOptions : filteringOptions;

  const optionOnClick = (o, i) => {
    if (type === "FILTER") {
      if (selectedOption.current === i) {
        selectOption(undefined);
        getMenuOption(0);
      } else {
        selectOption(i);
        getMenuOption(o.price);
      }
    } else if (selectedOption.current !== i) {
      selectOption(i);
      getMenuOption(o);
    }
  };

  var menu = (
    <ul>
      {options.map((option, index) => (
        <li className={selectedOption.current === index ? "selected" : undefined} onClick={() => optionOnClick(option, index)} key={index}>
          {type === "SORT" ? option : option.text}
          {selectedOption.current === index && <img src={checkMarkIcon} alt="check mark icon" />}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="menu">
      <h5 onClick={() => setShowMenu(!showMenu)}>
        {type}
        {showMenu ? <img style={{float: "right"}} src={expandLessIcon} alt="Show less icon" /> : <img style={{float: "right"}} src={expandMoreIcon} alt="Show more icon" />}
      </h5>
      {showMenu && menu}
    </div>
  );
}

export default Menu;