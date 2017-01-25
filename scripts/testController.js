(() => {
  "use strict"

angular.module("main")
.controller("TestController", ["$scope", "imageSearch", "speech", "quiz", function ($scope, imageSearch, speech, quiz) {
    this.getQuizItems = ()=> {
      return quiz.getItems();
    }

    this.quizIsDone = () => {
      return quiz.isDone();
    }

    this.startQuiz = () => {
      this.quizSize = 6;
      this.quizLength = 10;
      quiz.start({size: this.quizSize, length: this.quizLength});
    }

    this.checkOption = char => {
      quiz.check(char);
    }

    this.startQuiz();

    }]);

})();
