import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, FilterMenu, MenuItemCard } from "@app/base";
import { useMenu } from "@app/core";
import "./index.css";

export function MenuPage() {
  const navigate = useNavigate();
  const { data } = useMenu();

  const [selectedCategory, setSelectedCategory] = useState("mains");

  const filteredItems =
    selectedCategory === "all"
      ? data
      : data.filter((item) => item.category?.includes(selectedCategory));

  return (
    <main className="menuPage">
      <Container title="MENU" variant="full">
        <FilterMenu
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="menuGrid">
          {filteredItems.map((item) => {
            return (
              <MenuItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  ingredients={item.ingredients} 
                  category={[]}              
              />
            );
          })}
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
}
