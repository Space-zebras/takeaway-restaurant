import React from "react";
import "./index.css";

type Props = {
  children: React.ReactNode;
};

export function Container({ children }: Props) {
  return (
    <div className="menuContainer">
      <div className="menuContainer__banner" />
      <div className="menuContainer__inner">{children}</div>
    </div>
  );
}