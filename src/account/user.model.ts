export default class User {

    public id : Number|undefined;
    public name : String;
    public email : String;
    public workTime : Number|undefined;


    constructor(name: String, email: String, workTime?: Number, id?: Number,) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.workTime = workTime;
    }

    toJsonFormat = () => {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            email: this.email,
            work_time: this.workTime
        });
    }

}