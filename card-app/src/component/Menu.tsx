import { useState } from "react";

// Components
import MenuButton from "./MenuButton";

// Icons
import hamburgerClose from "../media/icons/hamburger_close.svg";
import hamburgerOpen from "../media/icons/hamburger_open.svg";

const Menu = () => {
  // state for the menu cross, hamburger to cross and back
  const [menuCross, setMenuCross] = useState(false);

  // function to change the hamburger menu to a cross and back to hamburger icon
  const changeMenu = () => {
    setMenuCross(!menuCross);
  };

  let menuIcon = <img src={hamburgerOpen} alt="" />;
  // changes the icon depending if the icon has been clicked or not
  if (menuCross) {
    menuIcon = <img src={hamburgerClose} alt="" />;
  } else {
    menuIcon = <img src={hamburgerOpen} alt="" />;
  }

  return (
    <div onClick={changeMenu}>
      <div>{menuIcon}</div>
      <MenuButton title={"Hello World"} />
    </div>
  );
};

export default Menu;
