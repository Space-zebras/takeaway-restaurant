import { Button } from "@app/base"
import hero from "./assets/hero.png"
import { useNavigate } from "react-router-dom"
import './index.css'

export function Hero () {
    const navigate = useNavigate();
    return(
       <section className="hero">
            <img src={hero} alt="hero-logo" />
            <Button size="small" onClick={() => navigate("/menu")} text="order here!" />
       </section> 
    )
}