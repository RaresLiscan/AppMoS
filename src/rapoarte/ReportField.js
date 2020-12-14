class ReportField {

    constructor() {
        this.id = "";
        this.report_id = 0;
        this.user_id = 0;
        this.name = "";
        this.project = "";
        this.date = "";
        this.time = 0;//minutes
        this.type = 1;//work or self development
    }

    //Setters
    setName(name) {
        this.name = name;
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

    formatAsJSONWithID() {
        const time = typeof this.time === "string" ? parseInt(this.time) : this.time;
        return JSON.stringify({
            id: this._id,
            title: this.title,
            project: this.project,
            date: this.date,
            time: time
        });
    }

    formatAsJson() {
        const time = typeof this.time === "string" ? parseInt(this.time) : this.time;
        return JSON.stringify({
            title: this.title,
            project: this.project,
            date: this.date,
            time: time
        });
    }
}

export default ReportField;