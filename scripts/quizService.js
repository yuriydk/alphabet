(()=>{
  "use strict"

angular.module("main")
.service("quiz", ["speech", "math", function (speech, math) {
  var getAlphabet = () => {
    var alphabet = [];
    for (var i = 0; i < 32; i++) {
      alphabet.push(String.fromCharCode("А".charCodeAt(0)+i));
    }
    alphabet.splice(6, 0, "Ё");
    return alphabet;
  }

  var items, alphabet, testItem, played, quizGridSize, quizLength, step;
  this.start = ({gridSize = 6, length = 10}) => {
    alphabet = getAlphabet();
    step = 0;
    played = [];
    quizGridSize = gridSize;
    quizLength = length;
    this.next();
  }

  this.check = char => {
    if(testItem.char == char){
      speech.say("Правильно, молодец!");

      this.next();
      return true;
    }
    speech.say("Не правильно!");
    speech.say("Покажи букву");
    speech.say(`[${testItem.char}]`);
    return false;
  }

  this.next = () => {
    if(step == quizLength - 1)
      return false;

    items = [];
    var except = played.slice();

    for (var i = 0; i < quizGridSize; i++) {
      var charIndex = math.randomIntegerExept(0, 32, except);
      items.push({char: alphabet[charIndex], charIndex: charIndex});
      except.push(charIndex);
    }

    testItem = items[math.randomInteger(0, quizGridSize - 1)];
    played.push(testItem.charIndex);
    speech.say("Покажи букву");
    speech.say(`[${testItem.char}]`, 0.5);
    return true;
  }

  this.getItems = () => { return items;}
}]);
})();
