const BoardCell = (props) => {
  return (
    <button
      id={props.pos}
      key={props.pos}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{
        width: "40px",
        height: "40px",
        textAlign: "center",
        verticalAlign: "top",
      }}
    >
      {props.content[props.pos]}
    </button>
  );
};

export default BoardCell;
