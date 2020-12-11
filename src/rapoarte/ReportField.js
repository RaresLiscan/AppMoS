class ReportField {

    constructor() {
        this.title = "Titlu inspirat";
        this.project = "ceva interesant";
        this.date = "2020-11-30";
        this.time = 120;//minutes
    }

    //Setters
    setTitle(title) {
        this.title = title;
    }

    setProject(project) {
        this.project = project;
    }

    setDate(date) {
        this.date = date;
    }

    setTime(time) {
        this.time = time;
    }

}

export default ReportField;