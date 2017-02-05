export default class TestController {
    constructor($scope, imageSearch, speech, quiz, lang, translation) {
        this.$inject = ["$scope", "imageSearch", "speech", "quiz", "lang", "translation"];
        this.quizService = quiz;
        this.translation = translation;
        this.lang = lang;
        this.startQuiz();
    }

    translate(text) {
        return this.translation.translate(text, this.lang);
    }

    getQuizItems() {
        return this.currentQuiz.getItems();
    }

    startQuiz(options) {
        this.currentQuiz = this.quizService.start({
            // size: 2,
            // length: 1,
            lang: this.lang
        });
    }

    quizIsDone() {
        return this.currentQuiz.isDone();
    }

    checkOption(quizItem) {
        if (this.isSpeaking)
            return;
        this.isSpeaking = true;
        quizItem.checked = true;
        this.currentQuiz.check(quizItem.char).then(() => {
            this.isSpeaking = false;
        });
    }
}
