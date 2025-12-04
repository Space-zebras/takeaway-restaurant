import "./index.css";

type ButtonProps = {
  size: "small" | "medium" | "large";
  onClick: () => void;
  text: string;
};

function Button({ size, onClick, text }: ButtonProps) {
  return (
    <button
      className={`button button_${size}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export { Button };
