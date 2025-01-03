import styles from "../../styles/Button.module.css";

type CustomButtonProps = {
  onClick: Function;
  label: string;
};

const CustomButton = ({ onClick, label }: CustomButtonProps) => {
  return (
    <button className={styles.button} onClick={() => onClick()}>
      {label}
    </button>
  );
};

export default CustomButton;
