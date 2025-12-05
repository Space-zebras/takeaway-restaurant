import { Logo } from "@app/core";
import './index.css'

export function Hero () {
    return(
       <section className="hero">
            <p className="hero__text">hungry and tired after work?</p>
            <span className="hero__logo"><img src={Logo} alt="Logo" className="hero__img"/></span>
            <h1 className="hero__heading">na'cho problem</h1>
       </section> 
    )
}