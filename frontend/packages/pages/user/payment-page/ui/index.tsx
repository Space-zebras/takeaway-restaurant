import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "@app/base";
import "./index.css";
import { useCreateOrder } from "@app/core/hooks/order/useCreateOrder";
import { useCartStore } from "@app/core";
import type { CreateOrderBody } from "@app/core";

export function PaymentPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { create } = useCreateOrder();
  const { items, totalPrice } = useCartStore();

  const inputs = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Phone number", name: "phone", type: "tel", required: true },
  ];

  const submitForm = async (paymentType: "online" | "in-house") => {
    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (items.length === 0) {
      return;
    }

    const cart = items.map(item => ({
      menuItem: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const orderBody: CreateOrderBody = {
      user: {
        name: formData.name || "",
        phoneNumber: formData.phone || ""
      },
      cart,
      totalPrice: totalPrice(),
      payment: paymentType
    };

    const createdOrder = await create(orderBody) as { orderId?: string } | null | undefined;

    if (createdOrder && createdOrder.orderId) {
      navigate(`/order/${createdOrder.orderId}`);
    } else {
      console.error("Order creation failed or missing orderId");
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <main className="payment-page">
      <div className="payment-page__layout">
        <h1 className="payment-page__logo">
          Na’cho<br />
          problem
        </h1>

        <div className="payment-page__content">
          <Container title="PAYMENT" variant="half">
            <form ref={formRef}>
              <Form inputs={inputs} formData={formData} setFormData={setFormData} />
              <div className="payment-page__buttons">
                <Button
                  type="button"
                  size="small"
                  text="swish"
                  onClick={() => submitForm("online")}
                />
                <Button
                  type="button"
                  size="small"
                  text="Pay on pickup"
                  onClick={() => submitForm("in-house")}
                />
              </div>
            </form>
          </Container>
        </div>
      </div>
    </main>
  );
}
