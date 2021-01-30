import battleShip from "../icons/battleship.svg";
import hit from "../icons/hit.png";
import sunk from "../icons/sunk.jpg";
import missed from "../icons/missed.png";

const BoardCell = (props) => {
  let picture;
  const style = {};

  switch (props.content[props.pos]) {
    case "B":
      picture = battleShip;
      style.backgroundColor = "skyblue";
      style.borderColor = "steelblue";
      break;
    case "S":
      picture = sunk;
      style.backgroundColor = "whitesmoke";
      style.borderColor = "yellow";
      break;
    case "X":
      picture = hit;
      style.backgroundColor = "yellow";
      style.borderColor = "red";
      break;
    case "/":
      picture = missed;
      break;
    default:
      picture = "#";
  }

  return (
    <button
      className="boardCell"
      id={props.pos}
      key={props.pos}
      onClick={props.onClick}
      disabled={props.disabled}
      style={style}
    >
      <img alt="" src={picture} width="20px" />
    </button>
  );
};

export default BoardCell;
