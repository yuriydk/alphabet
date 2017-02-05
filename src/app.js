import angular from "angular";
import ImageSearchService from "./imageSearchService";
import MathService from "./mathService";
import SpeechService from "./speechService";
import QuizService from "./quizService";
import TestController from "./testController";

angular
    .module("main", [])
    .service("math", MathService)
    .service("imageSearch", ImageSearchService)
    .service("speech", SpeechService)
    .service("quiz", QuizService)
    .controller("TestController", TestController);
