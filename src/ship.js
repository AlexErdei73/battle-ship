function Ship(position, direction, length) {
  this.position = position;
  this.direction = direction;
  this.length = length;
  this.coordinates = [];
  this.damages = [];

  const _recordDamage = (index) => {
    this.damages.push({ ...this.coordinates[index] });
  };

  const _findIndex = (array, position) => {
    return array.findIndex((element) => {
      return position.x === element.x && position.y === element.y;
    });
  };

  this.hit = (position) => {
    if (_findIndex(this.damages, position) !== -1) return false;
    else {
      const indexOfDamage = _findIndex(this.coordinates, position);
      if (indexOfDamage === -1) return false;
      else {
        _recordDamage(indexOfDamage);
        return true;
      }
    }
  };

  const _directionVector = () => {
    let vector = { dx: 0, dy: 0 };
    switch (this.direction) {
      case 0:
        vector = { dx: 1, dy: 0 };
        break;
      case 90:
        vector = { dx: 0, dy: 1 };
        break;
      case 180:
        vector = { dx: -1, dy: 0 };
        break;
      case 270:
        vector = { dx: 0, dy: -1 };
        break;
      default:
    }
    return vector;
  };

  const { dx, dy } = { ..._directionVector() };
  const newPosition = { ...this.position };
  for (let i = 0; i < this.length; i++) {
    this.coordinates.push({ ...newPosition });
    newPosition.x += dx;
    newPosition.y += dy;
  }
}

export default Ship;
