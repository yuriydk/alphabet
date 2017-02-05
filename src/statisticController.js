export default class StatisticController {
    constructor(quiz) {
        this.$inject = ["quiz"];
        this.statistics = quiz.getStatistics();
    }
}
