function Ship(pos, dir, len) {
  const _position = pos;
  let _direction = dir;
  let _length = len;
  let _coordinates = [];
  let _damages = [];

  const _recordDamage = (index) => {
    _damages.push({ ..._coordinates[index] });
  };

  const _findIndex = (array, position) => {
    return array.findIndex((element) => {
      return position.x === element.x && position.y === element.y;
    });
  };

  this.hit = (position) => {
    if (_findIndex(_damages, position) !== -1) return false;
    else {
      const indexOfDamage = _findIndex(_coordinates, position);
      if (indexOfDamage === -1) return false;
      else {
        _recordDamage(indexOfDamage);
        return true;
      }
    }
  };

  const _directionVector = () => {
    let vector = { dx: 0, dy: 0 };
    switch (_direction) {
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

  const _setUpCoordinates = () => {
    _coordinates = [];
    _damages = [];
    const { dx, dy } = { ..._directionVector() };
    const newPosition = { ..._position };
    for (let i = 0; i < _length; i++) {
      _coordinates.push({ ...newPosition });
      newPosition.x += dx;
      newPosition.y += dy;
    }
  };

  this.getCoordinates = () => {
    return [..._coordinates];
  };

  this.getDamages = () => {
    return [..._damages];
  };

  Object.assign(this, {
    get position() {
      return _position;
    },

    set position(position) {
      _position.x = position.x;
      _position.y = position.y;
      _setUpCoordinates();
    },

    get direction() {
      return _direction;
    },

    set direction(direction) {
      _direction = direction;
      _setUpCoordinates();
    },

    get length() {
      return _length;
    },

    set length(length) {
      _length = length;
      _setUpCoordinates();
    },
  });

  _setUpCoordinates();
}

export default Ship;
