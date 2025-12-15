import "./index.css";

type ButtonProps = {
  size: "small" | "medium" | "large";
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
};

function Button({ size, onClick, text, type = "button" }: ButtonProps) {
  return (
    <button
      className={`button button_${size}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export { Button };
