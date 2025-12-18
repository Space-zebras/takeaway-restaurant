import { Container } from "@app/base";
import { AdminStockItem } from "../children/admin-stockitem";
import "./index.css";

export function AdminStockPage() {
  // Mock data (backend hook later)
  const stock = [
    { stockItem: "Beans", quantity: 30 },
    { stockItem: "Cheese", quantity: 12 },
    { stockItem: "Tortilla", quantity: 50 },
    { stockItem: "Rice", quantity: 65 },
  ];

  return (
    <main className="adminStockPage">
      <Container title="Stock Levels" variant="full">
        <div className="adminStockPage__header">
          <span>Item</span>
          <span>Portions available</span>
        </div>

        <div className="adminStockPage__list">
          {stock.map((item) => (
            <AdminStockItem
              key={item.stockItem}
              name={item.stockItem}
              quantity={item.quantity}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
