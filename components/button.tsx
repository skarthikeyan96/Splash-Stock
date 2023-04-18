
type ButtonProps = {
    name: string,
    onClickHandler: any,
    className: string
}

const Button = ({name, onClickHandler, className}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={className}
    >
     {name}
    </button>
  );
};

export default Button;
