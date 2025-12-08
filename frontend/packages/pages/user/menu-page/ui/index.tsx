import React from "react";
import { Container, FilterMenu, MenuItemCard } from "@app/base";
import { useMenu } from "@app/core/hooks/useMenu";
import "./index.css";

export const MenuPage: React.FC = () => {
  const { data } = useMenu();

  return (
    <main className="menuPage">
      <Container title="Menu" variant="full">
        <FilterMenu />
        <div className="menuGrid">
          {data.map((item) => (
            <MenuItemCard
              key={item.menuItem}
              image="/Users/adam/Documents/Folkuniversitetet/takeaway-restaurant-2/frontend/packages/core/assets/Logo.webp"
              title={item.menuItem}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </Container>
    </main>
  );
};
