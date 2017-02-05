class Quiz {
    constructor({
        size = 6,
        length = 10
    }, alphabet, speaker, math) {
        this.math = math;
        this.speaker = speaker;
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

            return this.speaker.sayCongrats().then(() => this.next());
        }

        if (this.attempt == 0)
            this.statistic.wrong.push(this.testItem.char);

        this.attempt++;
        return this.speaker.sayWrong().then(() => this.speaker.sayShowLetter(this.testItem.char));
    }

    next() {
        if (this.isDone())
            return;

        this.items = [];
        this.attempt = 0;

        const testItemCharIndex = this.math.randomIntegerExept(0, this.alphabet.length - 1, this.played);
        this.testItem = {
            char: this.alphabet[testItemCharIndex],
            charIndex: testItemCharIndex
        };
        this.played.push(testItemCharIndex);
        let except = [testItemCharIndex];
        for (var i = 0; i < this.quizGridSize; i++) {
            var charIndex = this.math.randomIntegerExept(0, this.alphabet.length - 1, except);
            this.items.push({char: this.alphabet[charIndex], charIndex: charIndex});
            except.push(charIndex);
        }
        this.items[this.math.randomInteger(0, this.quizGridSize - 1)] = this.testItem;
        return this.speaker.sayShowLetter(this.testItem.char);
    }

    getItems() {
        return this.items;
    }

    isDone() {
        return this.step == this.quizLength;
    }
}

export default class QuizService {
    constructor(speaker, math) {
        this.$inject = ["speaker", "math"];
        this.math = math;
        this.speaker = speaker;
        this.statistics = [];
    }

    getAlphabet({lang, type, maxNumber}) {
        var alphabet = [];
        if (lang == "en" && type == "alphabet") {
            for (var i = 0; i < 26; i++) {
                alphabet.push(String.fromCharCode("A".charCodeAt(0) + i));
            }
        } else if (lang == "ru-RU" && type == "alphabet") {
            for (var i = 0; i < 32; i++) {
                alphabet.push(String.fromCharCode("А".charCodeAt(0) + i));
            }
            alphabet.splice(6, 0, "Ё");
        } else if (type == "numbers") {
            for (var i = 1; i <= maxNumber; i++) {
                alphabet.push(`${i}`);
            }
        }

        return alphabet;
    };

    getStatistics() {
        return this.statistics;
    }

    start(options) {
        const {lang, type} = options;
        this.speaker.setQuizParam(options);
        let quiz = new Quiz(options, this.getAlphabet(options), this.speaker, this.math);
        this.statistics.push({
            quizNumber: this.statistics.length + 1,
            statistic: quiz.statistic,
            lang: lang,
            type: type
        });
        return quiz;
    }
}
