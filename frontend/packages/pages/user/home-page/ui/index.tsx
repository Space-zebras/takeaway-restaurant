import { useNavigate } from "react-router-dom";
import { Container, MenuItemCard } from "@app/base";
import { Hero } from "../children/hero";
import './index.css'

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <main className="home-page">
      <section className="hero-section">
        <Hero />
      </section>
      <section className="best-sellers">
        <Container title="this weeks pick">
          <div className="click-container" onClick={() => navigate("/menu")}>
            <MenuItemCard 
              id="4133"
              image="https://onedishkitchen.com/wp-content/uploads/2022/02/nachos-one-dish-kitchen-square-2500.jpg"
              name="Beef Bandito Burrito"
              description="Savory meat wrapped in a tortilla with a kick of salsa."
              category={["mains", "burrito"]}
              ingredients={{tortilla: 1, beef: 1, salsa: 1}}
              price={140}
              showAmountButtons={false}
            />
          </div>
        </Container>
      </section>
    </main>

  )
}