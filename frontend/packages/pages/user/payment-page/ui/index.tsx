import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "@app/base";
import "./index.css";

export function PaymentPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const inputs = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Phone number", name: "phone", type: "tel", required: true },
  ];

  const submitForm = () => {
    const form = formRef.current;
    if (!form) return;

    if (form.checkValidity()) {
      console.log("Form values:", formData);
      navigate("/confirmation");
    } else {
      form.reportValidity();
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
            </form>
            <div className="payment-page__buttons">
                <Button size="small" text="swish" onClick={submitForm} />
                <Button size="small" text="Pay on pickup" onClick={submitForm} />
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}
