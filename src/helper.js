export const findIndex = (array, pos) => {
  return array.findIndex(function (element) {
    return element.x === pos.x && element.y === pos.y;
  });
};

export function randomPosition() {
  const x = (Math.random() * 10).floor();
  const y = (Math.random() * 10).floor();
  return { x, y };
}
