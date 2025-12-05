import React from "react";
import "./index.css";

// Components
import { Container, FilterMenu, MenuItemCard } from "@app/base";

export const MenuPage: React.FC = () => {
  return (
    <main className="menuPage">
      <Container title="Menu">
        {/* filter buttons */}
        <FilterMenu />
        <div className="menuGrid">
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

          <MenuItemCard
            image="https://www.tamingtwins.com/wp-content/uploads/2023/05/image-51.jpeg"
            title="Burritos"
            description="Ost, majchips, bönor"
            price={120}
          />

          <MenuItemCard
            image="https://www.tamingtwins.com/wp-content/uploads/2023/05/image-51.jpeg"
            title="Burritos Veg"
            description="Ost, majchips, bönor"
            price={120}
          />

          <MenuItemCard
            image="https://cookingformysoul.com/wp-content/uploads/2024/04/feat-carne-asada-tacos-min.jpg"
            title="Tacos"
            description="Ost, majchips, bönor"
            price={120}
          />

          <MenuItemCard
            image="https://cookingformysoul.com/wp-content/uploads/2024/04/feat-carne-asada-tacos-min.jpg"
            title="Tacos Veg"
            description="Ost, majchips, bönor"
            price={120}
          />
        </div>
      </Container>
    </main>
  );
};
