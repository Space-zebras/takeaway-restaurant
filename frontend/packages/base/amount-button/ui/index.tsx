import "./index.css";

type AmountButtonProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function AmountButtons({ value, onIncrement, onDecrement }: AmountButtonProps) {
  return (
    <div className="amountButtonWrapper">
      <button className="amountButton amountButton--minus" onClick={onDecrement}>−</button>

      <span className="amountButton__number">{value}</span>

      <button className="amountButton amountButton--plus" onClick={onIncrement}>+</button>
    </div>
  );
}
