import React from "react";
import "./Container.css";

type Props = {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="menuContainer">
      <div className="menuContainer__banner" />
      <div className="menuContainer__inner">{children}</div>
    </div>
  );
};
