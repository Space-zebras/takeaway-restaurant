import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, FilterMenu, MenuItemCard } from "@app/base";
import { useMenu } from "@app/core/hooks/useMenu";
import "./index.css";

export const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useMenu();

  const [selectedCategory, setSelectedCategory] = useState("mains");

  const filteredItems =
    selectedCategory === "all"
      ? data
      : data.filter((item) => item.category?.includes(selectedCategory));

  return (
    <main className="menuPage">
      <Container title="Menu" variant="full">
        <FilterMenu
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="menuGrid">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.menuItem}
              image="/Users/adam/Documents/Folkuniversitetet/takeaway-restaurant-2/frontend/packages/core/assets/Logo.webp"
              title={item.menuItem}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
        <div className="cart-button">
          <Button
            size="medium"
            text="Go to cart"
            onClick={() => navigate("/cart")}
          />
        </div>
      </Container>
    </main>
  );
};
