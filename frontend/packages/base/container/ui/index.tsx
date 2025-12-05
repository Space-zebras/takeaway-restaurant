import React from "react";
import "./index.css";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export function Container({ title, children }: Props) {
  return (
    <div className="container">
      <div className="container__banner"></div>

      <div className="container__inner">{children}</div>
    </div>
  );
}
