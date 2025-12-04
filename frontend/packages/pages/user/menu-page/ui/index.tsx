import React from "react";
import "./index.css";

// Components
import { Container, FilterMenu, MenuItemCard } from "@app/base";

export const MenuPage: React.FC = () => {
  return (
    <main className="menuPage">
      <Container title="Menu" variant="full">
        {/* filter buttons */}
        <FilterMenu />

        {/* temporary menu items */}
        <MenuItemCard
          image="https://onedishkitchen.com/wp-content/uploads/2022/02/nachos-one-dish-kitchen-square-2500.jpg"
          title="Nachotallrik"
          description="Ost, majchips, köttfärs"
          price={120}
        />

        <MenuItemCard
          image="https://onedishkitchen.com/wp-content/uploads/2022/02/nachos-one-dish-kitchen-square-2500.jpg"
          title="Nachotallrik Veg"
          description="Ost, majchips, bönor"
          price={120}
        />
      </Container>
    </main>
  );
};
