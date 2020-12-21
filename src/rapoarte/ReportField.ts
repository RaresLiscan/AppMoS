//Clasa model pentru campurile rapoartelor
//Este utila ca sa stim ce se afla intr-un raport si sa ne fie usor de luat datele din ea

class ReportField {

    public id:String = "";
    public report_id : String = "";
    public user_id : String = "";
    public name : String = "";
    public project : String = "";
    public date : String = "";
    public time : Number = 0;
    public type : Number = 0;

    // constructor() {
    //     this.id = "";
    //     this.report_id = "";
    //     this.user_id = "";
    //     this.name = "";
    //     this.project = "";
    //     this.date = "";
    //     this.time = 0;//minutes
    //     this.type = 1;//work or self development
    // }

    constructor(id?:String|any, 
            report_id?:String|any, 
            user_id?:String|any, 
            name?:String|any, 
            project?:String|any, 
            date?:String|any, 
            time?:Number|any, 
            type?:Number|any) {
        this.id = id !== undefined ? id : "";
        this.report_id = report_id !== undefined ? report_id : "";
        this.user_id = user_id !== undefined ? user_id : "";
        this.name = name !== undefined ? name : "";
        this.project = project !== undefined ? project : "";
        this.date = date !== undefined ? date : "";
        this.time = time !== undefined ? time : 0;
        this.type = type !== undefined ? type : 0;
    }

    //Setters
    setName(name:String) {
        this.name = name;
    }

    setProject(project:String) {
        this.project = project;
    }

    setDate(date:String) {
        this.date = date;
    }

    setTime(time:Number) {
        this.time = time;
    }

    //Pentru request-uri de tip PUT, avem nevoie de o formatare cu tot cu ID
    formatAsJSONWithID() {
        const time = typeof this.time === "string" ? parseInt(this.time) : this.time;
        return JSON.stringify({
            id: this.id,
            title: this.name,
            project: this.project,
            date: this.date,
            time: time
        });
    }

    //Pentru request-uri de tip post, nu este necesar sa punem si ID
    formatAsJson() {
        const time = typeof this.time === "string" ? parseInt(this.time) : this.time;
        return JSON.stringify({
            title: this.name,
            project: this.project,
            date: this.date,
            time: time
        });
    }
}

export default ReportField;