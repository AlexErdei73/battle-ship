const TitleBar = (props) => {
  return (
    <div className="titleBar">
      <h1 className={props.center ? "center" : ""}>BATTLESHIP</h1>
    </div>
  );
};

export default TitleBar;
