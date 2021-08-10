//Clasa model pentru campurile rapoartelor
//Este utila ca sa stim ce se afla intr-un raport si sa ne fie usor de luat datele din ea

class ReportField {

    public id:String = "";
    public reportId : String = "";
    public name : String = "";
    public project : String = "";
    public date : String = "";
    public time : Number = 0;
    public type : Number = 0;

    constructor(id?:String|any, 
            reportId?:String|any, 
            name?:String|any, 
            project?:String|any, 
            date?:String|any, 
            time?:String|any, 
            type?:Number|any) {
        this.id = id !== undefined ? id : "";
        this.reportId = reportId !== undefined ? reportId : "";
        this.name = name !== undefined ? name : "";
        this.project = project !== undefined ? project : "";
        this.date = date !== undefined ? date : this.formatDate(new Date());
        this.time = time !== undefined ? time : 15;
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

    formatDate(date:Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
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