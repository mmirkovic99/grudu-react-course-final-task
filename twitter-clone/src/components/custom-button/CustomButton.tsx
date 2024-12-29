import "./CustomButton.css";

type CustomButtonProps = {
  onClick: Function;
  label: string;
};

const CustomButton = ({ onClick, label }: CustomButtonProps) => {
  return (
    <button className="custom-button" onClick={() => onClick()}>
      {label}
    </button>
  );
};

export default CustomButton;
