import { useNavigate } from "react-router-dom";
import { Container, MenuItemCard } from "@app/base";
import { Hero } from "../children/hero";
import { Button } from "@app/base";
import './index.css'

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <main className="home-page">
      <section className="hero-section">
        <Hero />
        <Button size="small" onClick={() => navigate("/menu")} text="order here!" />
      </section>
      <section className="best-sellers">
        <Container title="best sellers">
          <div className="click-container" onClick={() => navigate("/menu")}>
            <MenuItemCard 
              image="https://onedishkitchen.com/wp-content/uploads/2022/02/nachos-one-dish-kitchen-square-2500.jpg"
              title="Nachotallrik"
              description="Ost, majchips, köttfärs"
              price={120}
            />
          </div>
        </Container>
      </section>
    </main>

  )
}