import angular from "angular";
import "angular-ui-router";
import "angular-ui-bootstrap"
import ImageSearchService from "./imageSearchService";
import MathService from "./mathService";
import SpeechService from "./speechService";
import QuizService from "./quizService";
import TestController from "./testController";
import StatisticController from "./statisticController";
import TranslationService from "./translationService";
import SpeakerService from "./SpeakerService";
import QuizSettingsService from "./quizSettingsService";
import SettingsController from "./settingsController";

angular.module("main", ["ui.router", "ui.bootstrap"]).config([
        "$locationProvider", $locationProvider => {
            // $locationProvider.html5Mode(true);
        }
    ]).config([
        "$stateProvider", $stateProvider => {
            $stateProvider.state({
                name: "quiz",
                url: "/quiz/{lang}/{type}",
                controller: "TestController",
                controllerAs: "ctrl",
                templateUrl: "/alphabet/templates/quiz.html",
                resolve: {
                    quizParams: $stateParams => ({
                        lang: $stateParams.lang.toLowerCase() == "ru" ? "ru-RU" : $stateParams.lang.toLowerCase(),
                        type: $stateParams.type.toLowerCase()
                    })
                }
            }).state({
                name: "statistic",
                url: "/stat",
                controller: "StatisticController",
                controllerAs: "ctrl",
                templateUrl: "/alphabet/templates/statistic.html"
            }).state({
                name: "settings",
                url: "/settings",
                controller: "SettingsController",
                controllerAs: "ctrl",
                templateUrl: "/alphabet/templates/settings.html"
            })
        }
    ])
    .service("math", MathService)
    .service("imageSearch", ImageSearchService)
    .service("speech", SpeechService)
    .service("quiz", QuizService)
    .service("translation", TranslationService)
    .service("speaker", SpeakerService)
    .service("quizSettings", QuizSettingsService)
    .controller("TestController", TestController)
    .controller("StatisticController", StatisticController)
    .controller("SettingsController", SettingsController)
    .controller("NavigationController", [function() {
        this.collapse = () => {
            this.isNavCollapsed = true;
        };
        this.collapse();
    }]);
