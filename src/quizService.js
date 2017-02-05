class Quiz {
    constructor({
        size = 6,
        length = 10
    }, alphabet, speech, math) {
        this.math = math;
        this.speech = speech;
        this.items = null,
        this.testItem = null,
        this.played = [];
        this.alphabet = alphabet;
        this.quizGridSize = size,
        this.quizLength = length,
        this.step = 0;
        this.attempt = 0;
        this.statistic = {
            correct: [],
            wrong: []
        };
        this.next();

    }

    check(char) {
        if (this.testItem.char == char) {
            this.step++;
            this.testItem.correct = true;
            if (this.attempt == 0)
                this.statistic.correct.push(this.testItem.char);

            return this.speech.sayCongrats().then(() => this.next());
        }

        if (this.attempt == 0)
            this.statistic.wrong.push(this.testItem.char);

        this.attempt++;
        return this.speech.sayWrong().then(() => this.speech.sayShowLetter(this.testItem.char));
    }

    next() {
        if (this.isDone())
            return;

        this.items = [];
        this.attempt = 0;
        var except = this.played.slice();

        for (var i = 0; i < this.quizGridSize; i++) {
            var charIndex = this.math.randomIntegerExept(0, this.alphabet.length - 1, except);
            this.items.push({char: this.alphabet[charIndex], charIndex: charIndex});
            except.push(charIndex);
        }

        this.testItem = this.items[this.math.randomInteger(0, this.quizGridSize - 1)];
        this.played.push(this.testItem.charIndex);
        return this.speech.sayShowLetter(this.testItem.char);
    }

    getItems() {
        return this.items;
    }

    isDone() {
        return this.step == this.quizLength;
    }
}

export default class QuizService {
    constructor(speech, math) {
        this.$inject = ["speech", "math"];
        this.math = math;
        this.speech = speech;
        this.quizes = [];
    }

    getAlphabet(lang) {
        var alphabet = [];
        if (lang == "en") {
            for (var i = 0; i < 26; i++) {
                alphabet.push(String.fromCharCode("A".charCodeAt(0) + i));
            }
        } else if (lang == "ru-RU") {
            for (var i = 0; i < 32; i++) {
                alphabet.push(String.fromCharCode("А".charCodeAt(0) + i));
            }
            alphabet.splice(6, 0, "Ё");
        }

        return alphabet;
    };

    getStatistics() {
        return this.quizes.map((q, i) => {
            return {
                quizNumber: i + 1,
                statistic: q.statistic
            };
        })
    }

    start(options) {
        const {lang} = options;
        this.speech.setLang(lang);
        let quiz = new Quiz(options, this.getAlphabet(lang), this.speech, this.math);
        this.quizes.push(quiz);
        return quiz;
    }
}
