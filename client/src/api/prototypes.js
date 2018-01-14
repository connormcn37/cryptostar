// indexOf to support ie6,7,8
/*eslint-disable no-extend-native */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj, fromIndex) {
    if (fromIndex == null) {
      fromIndex = 0;
    } else if (fromIndex < 0) {
      fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
      if (this[i] === obj) return i;
    }
    return -1;
  };
}
if (!Array.prototype.contains) {
  Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
    return false;
  };
}
