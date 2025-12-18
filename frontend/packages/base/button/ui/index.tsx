import "./index.css";

type ButtonProps = {
  size: "small" | "medium" | "large";
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

function Button({ size, onClick, text, type = "button", disabled = false }: ButtonProps) {
  return (
    <button
      className={`button button_${size}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export { Button };
