export default class MathService{
  randomInteger (min, max){
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

  randomIntegerExept (min, max, except){
    do {
      var result = this.randomInteger(min, max);
    } while (~except.indexOf(result));
      return result;
  }
}
