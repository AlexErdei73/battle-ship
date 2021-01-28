const BoardCell = (props) => {
  return (
    <button
      className="boardCell"
      id={props.pos}
      key={props.pos}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.content[props.pos]}
    </button>
  );
};

export default BoardCell;
