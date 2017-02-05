export default class TestController {
    constructor($scope, imageSearch, speech, quiz) {
        this.$inject = ["$scope", "imageSearch", "speech", "quiz"];
        this.quiz = quiz;
        this.startQuiz();
    }

    getQuizItems() {
        return this.quiz.getItems();
    }

    startQuiz() {
        this.quizSize = 6;
        this.quizLength = 10;
        this.quiz.start({size: this.quizSize, length: this.quizLength});
    }

    quizIsDone() {
        return this.quiz.isDone();
    }

    checkOption(char) {
        this.quiz.check(char);
    }
}
