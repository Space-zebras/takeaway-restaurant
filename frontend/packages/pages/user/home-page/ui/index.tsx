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
              image="https://onedishkitchen.com/wp-content/uploads/2022/02/nachos-one-dish-kitchen-square-2500.jpg"
              title="Beef Bandito Burrito"
              description="Savory meat wrapped in a tortilla with a kick of salsa."
              ingredients="tortilla, beef, salsa "
              price={140}
              showAmountButtons={false}
            />
          </div>
        </Container>
      </section>
    </main>

  )
}