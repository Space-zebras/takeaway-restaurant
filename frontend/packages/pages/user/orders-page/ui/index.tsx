import React from "react";
import "./index.css";

// Components
import { Container, FilterOrders, OrderItem, Button } from "@app/base";
import { useGetOrders } from "@app/core";

export const OrdersPage: React.FC = () => {
  const { data, loading, error } = useGetOrders();

  const orders = data ?? []

  const [filter, setFilter] = React.useState("All");
  const [phoneInput, setPhoneInput] = React.useState("");
  const [submittedPhone, setSubmittedPhone] = React.useState("");

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  const hasSearched: boolean = submittedPhone.length > 0;

    const filteredOrdersByPhone = hasSearched
      ? orders.filter((o) => o.user.phoneNumber === submittedPhone.trim())
      : [];

  const filteredOrders =
    filter === "All"
      ? filteredOrdersByPhone
      : filteredOrdersByPhone.filter(
          (o) => o.status.toLowerCase() === filter.toLowerCase()
        );

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPhone(phoneInput.trim());
  }

  return (
    <main className="ordersPage">
      {!hasSearched && (
        <Container title="Your Orders">
          <div className="form__container">
            <h2>Want to see your earlier orders?</h2>
            <form onSubmit={handlePhoneSubmit} className="form__group">
              <label className="form__label">Enter your phone number</label>
              <input
                type="text"
                className="form__input"
                placeholder="e.g. 0701122334"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
              <Button size="medium" text="Search" />
            </form>
          </div>
        </Container>
      )}
      {hasSearched && (
        <Container title="Your Orders">
          
          {/* filter buttons */}
          <FilterOrders active={filter} onChange={setFilter} />
          {filteredOrders.map((order) => (
            <OrderItem
              key={order.orderId}
              date={order.createdAt}
              orderNumber={order.orderId}
              status={order.status}
            />
          ))}
        </Container>
      )}
    </main>
  );
};
