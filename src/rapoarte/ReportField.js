class ReportField {

    constructor() {
        this.title = "";
        this.project = "";
        this.date = "";
        this.time = 0;//minutes
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