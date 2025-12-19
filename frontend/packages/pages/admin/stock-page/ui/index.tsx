import { Container } from "@app/base";
import { AdminStockItem } from "../children/admin-stockitem";
import { useGetStock } from "@app/core/hooks/stock/useGetStock";
import { useUpdateStock } from "@app/core/hooks/stock/useUpdateStock";
import "./index.css";

export function AdminStockPage() {
  const { data, loading, error } = useGetStock();
  const { updateStock } = useUpdateStock();

  const handleChange = async (name: string, quantity: number) => {
    await updateStock([{ stockItem: name, quantity }]);
  };

  if (loading) return <p>Loading stock...</p>;
  if (error) return <p>Error loading stock: {error}</p>;

  return (
    <Container title="Stock Levels" variant="full">
      <div className="adminStockPage__header">
        <span>Item</span>
        <span>Portions available</span>
      </div>
      <div className="adminStockPage__list">
        {data.map((item) => (
          <AdminStockItem
            key={item.stockItem}
            name={item.stockItem}
            quantity={item.quantity}
            onChange={(qty) => handleChange(item.stockItem, qty)}
          />
        ))}
      </div>
    </Container>
  );
}
