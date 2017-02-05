export default class QuizSettingsService {
    //todo save in localstorage
    constructor() {
        this.settings = {
            maxNumber: 20,
            quizLength: 10,
            quizCells: 6
        }
    }

    setSettings(settings) {
        this.settings = settings;

    }

    getSettings() {
        return this.settings;
    }
}
