export default class TestController {
    constructor($scope, imageSearch, speech, quiz, quizParams, translation, quizSettings) {
        this.$inject = ["$scope", "imageSearch", "speech", "quiz", "quizParams", "translation", "quizSettings"];
        this.quizService = quiz;
        this.translation = translation;
        this.quizParams = quizParams;
        this.quizSettings = quizSettings.getSettings();
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
            size: this.quizSettings.quizCells,
            length: this.quizSettings.quizLength,
            maxNumber: this.quizSettings.maxNumber,
            lang: this.quizParams.lang,
            type: this.quizParams.type
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
