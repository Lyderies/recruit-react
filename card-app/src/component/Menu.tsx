import { useState } from "react";

// Components
import MenuButton from "./MenuButton";

// Styling
import "../styling/Menu.css";

// Icons
import hamburgerClose from "../media/icons/hamburger_close.svg";
import hamburgerOpen from "../media/icons/hamburger_open.svg";

const Menu = () => {
  // states
  const [menuCross, setMenuCross] = useState(true);
  const [hidden, setHidden] = useState(true);

  const handleHiddenChange = (menuCross: boolean) => {
    if (!menuCross) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  };

  // function to change the hamburger menu to a cross and back to hamburger icon
  const changeMenu = () => {
    handleHiddenChange(menuCross);
    setMenuCross(!menuCross);
  };
  let menuIcon = <img className="hamburgerImage" src={hamburgerOpen} alt="" />;
  // changes the icon depending if the icon has been clicked or not
  if (!menuCross) {
    menuIcon = <img className="hamburgerImage" src={hamburgerClose} alt="" />;
  } else {
    menuIcon = <img className="hamburgerImage" src={hamburgerOpen} alt="" />;
  }

  // returns menu is hidden is false, hides menu if true
  const SetMenu = () => {
    if (hidden) {
      return <div></div>;
    } else {
      return (
        <div className="activeMenu">
          <MenuButton title={"Hello World"} />
          <MenuButton title={"Hello World"} />
          <MenuButton title={"Hello World"} />
          <MenuButton title={"Hello World"} />
          <MenuButton title={"Hello World"} />
        </div>
      );
    }
  };

  return (
    <div className="menu">
      <div className="hamburgerBar" onClick={changeMenu}>
        {menuIcon}
      </div>
      <SetMenu />
    </div>
  );
};

export default Menu;
