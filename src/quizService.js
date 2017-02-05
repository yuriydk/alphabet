const getAlphabet = () => {
    var alphabet = [];
    for (var i = 0; i < 32; i++) {
        alphabet.push(String.fromCharCode("А".charCodeAt(0) + i));
    }
    alphabet.splice(6, 0, "Ё");
    return alphabet;
};

let items,
    alphabet,
    testItem,
    played,
    quizGridSize,
    quizLength,
    step;

export default class QuizService {
    constructor(speech, math) {
        this.$inject = ["speech", "math"];
        this.math = math;
        this.speech = speech;
    }

    check(char) {
        if (testItem.char == char) {
            step++;
            this.speech.say("Правильно, молодец!").then(() => {
                this.next();
            });
            return;
        }
        this.speech.say("Не правильно!");
        this.speech.say("Покажи букву");
        this.speech.say(`[${testItem.char}]`, 0.5);
        return;
    }

    next() {
        if (this.isDone())
            return;

        items = [];
        var except = played.slice();

        for (var i = 0; i < quizGridSize; i++) {
            var charIndex = this.math.randomIntegerExept(0, 32, except);
            items.push({char: alphabet[charIndex], charIndex: charIndex});
            except.push(charIndex);
        }

        testItem = items[this.math.randomInteger(0, quizGridSize - 1)];
        played.push(testItem.charIndex);
        this.speech.say("Покажи букву");
        this.speech.say(`[${testItem.char}]`, 0.5);
        return;
    }

    getItems() {
        return items;
    }

    isDone() {
        return step == quizLength;
    }

    start({
        gridSize = 6,
        length = 10
    }) {
        alphabet = getAlphabet();
        step = 0;
        played = [];
        quizGridSize = gridSize;
        quizLength = length;
        this.next();
    }
}
