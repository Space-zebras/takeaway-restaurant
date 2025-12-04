import { Button, Container, Form } from "@app/base";
import "./index.css";

export function PaymentPage() {
  const inputs = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Phone number", name: "phone", type: "tel", required: true },
  ];

  const handlePayment = (formData: any) => {
    console.log("Payment submitted:", formData);
  };

  return (
    <main className="payment-page">
      <div className="payment-page__layout">
        <h1 className="payment-page__logo">
            Na’cho<br/>
            problem
        </h1>

        <div className="payment-page__content">
          <Container title="Add info" variant="half">
              <Form inputs={inputs} onSubmit={handlePayment} />
          </Container>

          <div className="payment-page__buttons">
            <Button size="medium" text="Pay on pickup" onClick={() => {}} />
            <Button size="medium" text="Pay now" onClick={() => {}} />
          </div>
        </div>

      </div>

    </main>
  );
}
