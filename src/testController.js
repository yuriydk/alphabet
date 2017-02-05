export default class TestController {
    constructor($scope, imageSearch, speech, quiz, lang) {
        this.$inject = ["$scope", "imageSearch", "speech", "quiz", "lang"];
        this.quizService = quiz;
        this.startQuiz({size: 6, length: 10, lang});
    }

    getQuizItems() {
        return this.currentQuiz.getItems();
    }

    startQuiz(options) {
        this.currentQuiz = this.quizService.start(options);
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
