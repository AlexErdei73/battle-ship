const TitleBar = (props) => {
  return (
    <div className="titleBar">
      <h1 className={props.isTitleInView ? "center" : ""}>BATTLESHIP</h1>
      <div className="left">
        <h1 className="playerScore">{props.playerScore}</h1>
      </div>
      <div className="right">
        <h1 className="computerScore">{props.computerScore}</h1>
      </div>
    </div>
  );
};

export default TitleBar;
