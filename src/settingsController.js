export default class SettingsController {
    constructor(quizSettings) {
        this.$inject = ["quizSettings"];
        this.quizSettings = quizSettings;
        this.settings = quizSettings.getSettings();
    }
    saveSettings() {
        this.quizSettings.setSettings(this.settings);
    }
}
