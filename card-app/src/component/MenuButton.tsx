import React from "react";

export type ButtonProps = {
  title: string;
};

const MenuButton: React.FC<ButtonProps> = (props) => {
  const { title } = props;

  return <button className="MenuButton">{title}</button>;
};

export default MenuButton;
