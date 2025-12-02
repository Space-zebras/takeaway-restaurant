import React from "react";
import "./MenuPage.css";

// Components
import { Container } from "../../../base/container/Container";
import { FilterMenu } from "../../../base/filter-menu/FilterMenu";

export const MenuPage: React.FC = () => {
  return (
    <main className="menuPage">
      <Container>
        {/* filter buttons */}
        <FilterMenu />

        {/* placeholder for now */}
        <section className="menuPage__contentPlaceholder">
          <p>Menu items ska visas här…</p>
        </section>
      </Container>
    </main>
  );
};
