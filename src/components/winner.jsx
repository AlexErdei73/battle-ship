const Winner = (props) => {
  let classNames = "info";
  if (props.hide) classNames += " hide";
  else classNames += " show";

  return (
    <h1 className={classNames} id="winner">
      {!props.winner.name
        ? "WINNER:"
        : `WINNER: ${props.winner.name.toUpperCase()}`}
    </h1>
  );
};

export default Winner;
