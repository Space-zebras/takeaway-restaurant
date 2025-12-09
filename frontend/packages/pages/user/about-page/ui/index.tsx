import { Container } from "@app/base";
import "./index.css";
import { Tacos, Burritos, Nachos, } from "@app/core";

export function AboutPage() {
  return (
    <div className="about-us">
      <Container title="ABOUT US">
        <div className="about-content">
          <div className="images-wrapper">
            <img src={Tacos} alt="Tacos" className="top-image" />
            <img src={Burritos} alt="Burritos" className="bottom-image left" />
            <img src={Nachos} alt="Nachos" className="bottom-image right" />
          </div>
          <div className="about-text">
            <p>
              Welcome to Na’cho Problem, Sweden’s boldest tribute to the art of nachos.
              Born from a love of great food, good company, and a little bit of mischief, we set out to create a
              place where every day feels like a fiesta.
            </p>
            <p>
              At Na’cho Problem, we mix Mexican-inspired flavors with Swedish creativity to bring you nachos like you’ve
              never tasted before—layered, loaded, and made with heart. We believe food should be fun, flavorful, and shared.
              That’s why our kitchen focuses on fresh ingredients, homemade sauces, and toppings that balance tradition with playful twists.
              Whether you’re here for classic comfort or daring combinations, we’ve got a plate with your name on it.
            </p>
            <p>
              Whether you’re stopping by for a quick snack or settling in for a full meal, every visit to Na’cho Problem is an experience to savor.
              Our team takes pride in crafting each plate with care, from the crispiness of the chips to the bold flavors of our homemade salsas and toppings.
              We love seeing people bond lovers try new combinations that surprise and delight the taste buds. So come hungry, bring your curiosity,
              and leave with a smile.
            </p>
            <p>
              Na’cho Problem isn’t just a restaurant—it’s a cozy hangout where friends meet, cravings are answered, and every messy,
              cheesy moment is encouraged. So grab a seat, dig in, and let us turn your nacho cravings into… well, na’cho problem.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}