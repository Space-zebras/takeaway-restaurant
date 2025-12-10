import React from "react";
import "./index.css";

type ContainerProps = {
  title?: string;
  children: React.ReactNode;
  variant?: "full" | "half";
};

export function Container({
  title,
  children,
  variant = "full",
}: ContainerProps) {
  return (
    <div className={`container container--${variant}`}>
      {title && (
        <div className="container__banner">
          <h2 className="container__title">{title}</h2>
        </div>
      )}

      <div className="container__inner">{children}</div>
    </div>
  );
}
