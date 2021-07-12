import React from "react";
import "../styling/MenuButton.css";

export type ButtonProps = {
  title: string;
};

const MenuButton: React.FC<ButtonProps> = (props) => {
  const { title } = props;

  return <section className="menuButton">{title}</section>;
};

export default MenuButton;
