//Clasa model pentru campurile rapoartelor
//Este utila ca sa stim ce se afla intr-un raport si sa ne fie usor de luat datele din ea

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

    //Pentru request-uri de tip PUT, avem nevoie de o formatare cu tot cu ID
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

    //Pentru request-uri de tip post, nu este necesar sa punem si ID
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