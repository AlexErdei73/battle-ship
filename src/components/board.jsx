import BoardCell from "./boardcell";

const Board = (props) => {
  const cells = [];
  for (let i = 0; i < 100; i++) {
    cells.push(i);
  }

  return (
    <div className="board" id={props.id} onMouseLeave={props.onMouseLeave}>
      {cells.map((pos) => {
        return (
          <BoardCell
            pos={pos}
            key={pos}
            content={props.content}
            disabled={props.disabled}
            onClick={props.onClick}
            hide={props.areBoardCellsHidden[pos]}
            onPointerDown={props.onPointerDown}
            onPointerMove={props.onPointerMove}
            onPointerUp={props.onPointerUp}
            onDoubleClick={props.onDoubleClick}
          ></BoardCell>
        );
      })}
    </div>
  );
};

export default Board;
