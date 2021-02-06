const Usage = (props) => {
  let classNames = "info";
  if (props.hide) classNames += " hide";
  else classNames += " show";

  return (
    <div className={classNames} id="usage">
      <p>
        You can drag and drop your ships to their place. Use double click to
        rotate the ships. The program maintains 2 cells distance between the
        ships and keeps them on the game board.
      </p>
    </div>
  );
};

export default Usage;
