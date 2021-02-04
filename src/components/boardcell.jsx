import battleShip from "../icons/battleship.svg";
import hit from "../icons/hit.png";
import sunk from "../icons/sunk.jpg";
import missed from "../icons/missed.png";

const BoardCell = (props) => {
  let picture;
  let pictureSize = "40px";
  let pictureStyle = {
    position: "relative",
    left: "-10px",
    bottom: "0",
    height: "38px",
  };
  const style = {};
  let classNames = "boardCell";

  switch (props.content[props.pos]) {
    case "B":
      picture = battleShip;
      style.backgroundColor = "skyblue";
      style.borderColor = "steelblue";
      break;
    case "S":
      picture = sunk;
      style.borderColor = "yellow";
      break;
    case "X":
      picture = hit;
      style.backgroundColor = "yellow";
      style.borderColor = "red";
      pictureSize = "20px";
      pictureStyle = {};
      break;
    case "/":
      picture = missed;
      break;
    default:
      picture = "#";
      pictureStyle = {};
      pictureSize = "0";
  }
  if (props.hide) classNames += " hide";
  else classNames += " show";

  return (
    <button
      className={classNames}
      id={props.pos}
      key={props.pos}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseEnter={props.onMouseEnter}
      onMouseUp={props.onMouseUp}
      onDoubleClick={props.onDoubleClick}
      disabled={props.disabled}
      style={style}
    >
      <img alt="" src={picture} width={pictureSize} style={pictureStyle} />
    </button>
  );
};

export default BoardCell;
