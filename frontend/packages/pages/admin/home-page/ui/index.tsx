import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@app/base";
import "./index.css";

export function AdminHomePage() {
  const navigate = useNavigate();

  return (
    <main className="adminHomePage">
      <div className="adminHomePage__titleBlock">
        <h1 className="adminHomePage__title">
          NA'CHO <br /> PROBLEM
        </h1>

        <h2 className="adminHomePage__subtitle">Backstage</h2>
      </div>

      <div className="adminHomePage__buttonColumn">
        <Button
          size="large"
          text="ORDERS"
          onClick={() => navigate("/admin/orders-page")}
        />

        <Button
          size="large"
          text="EDIT MENU"
          onClick={() => navigate("/admin/menu-page")}
        />

        <Button
          size="large"
          text="STOCK"
          onClick={() => navigate("/admin/stock-page")}
        />
      </div>
    </main>
  );
}
