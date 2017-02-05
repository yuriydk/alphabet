import angular from "angular";
import 'angular-ui-router';
import ImageSearchService from "./imageSearchService";
import MathService from "./mathService";
import SpeechService from "./speechService";
import QuizService from "./quizService";
import TestController from "./testController";
import StatisticController from "./statisticController";
import TranslationService from "./translationService";

angular
    .module("main", ["ui.router"])
    .config(["$locationProvider", $locationProvider => {
        // $locationProvider.html5Mode(true);
    }])
    .config(["$stateProvider", $stateProvider => {
        $stateProvider
            .state({
                name: "quiz",
                url: "/quiz/{lang}",
                controller: "TestController",
                controllerAs: "ctrl",
                templateUrl: "/alphabet/templates/quiz.html",
                resolve: {
                    lang: ($stateParams) => {
                        return $stateParams.lang.toLowerCase() == "ru" ? "ru-RU" : "en";
                    }
                }
            })
            .state({
                name: "statistic",
                url: "/stat",
                controller: "StatisticController",
                controllerAs: "ctrl",
                templateUrl: "/alphabet/templates/statistic.html"
            })
    }])
    .service("math", MathService)
    .service("imageSearch", ImageSearchService)
    .service("speech", SpeechService)
    .service("quiz", QuizService)
    .service("translation", TranslationService)
    .controller("TestController", TestController)
    .controller("StatisticController", StatisticController);
