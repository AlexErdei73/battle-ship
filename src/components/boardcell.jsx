import battleShip from "../icons/battleship.svg";
import hit from "../icons/hit.png";
import sunk from "../icons/sunk.jpg";
import missed from "../icons/missed.png";

const BoardCell = (props) => {
  let picture;
  let pictureSize = "27px";
  let pictureStyle = {
    position: "relative",
    left: "-8px",
    bottom: "0",
    height: "27px",
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
      pictureSize = "12px";
      pictureStyle = {};
      break;
    case "/":
      picture = missed;
      break;
    default:
      picture = "#";
      pictureStyle = {};
      pictureSize = "27px";
  }
  if (props.hide) classNames += " hide";
  else classNames += " show";

  return (
    <button
      className={classNames}
      id={props.pos}
      key={props.pos}
      onClick={props.onClick}
      onPointerDown={props.onPointerDown}
      onPointerMove={props.onPointerMove}
      onPointerUp={props.onPointerUp}
      onDoubleClick={props.onDoubleClick}
      disabled={props.disabled}
      style={style}
    >
      <img alt="" src={picture} width={pictureSize} style={pictureStyle} />
    </button>
  );
};

export default BoardCell;
