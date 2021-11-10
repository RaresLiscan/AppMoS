import axios from 'axios';
import authProvider from '../account/authProvider';

//Clasa asta contine metode statice prin care facem request-uri catre baza de date

/*
    TODO 1: Request la /activities/ cu un array continand obiecte de tip ReportField
    TODO 2: La report fields trebuie setat fiecare report_id si user_id

*/

const API_URL = "http://localhost:8081/activities";
// const API_URL = "https://api.amosed.ro/api/reports/";
export default class ReportOperations {

    static async addActivity(data, month, year) {
        const userId = authProvider.getUser().id;
        const activities = [];
        data[0].map(act => {
            console.log(act);
            console.log(parseInt(act.time)>0);
            if (act.name.length > 0 && act.project.length > 0 && parseInt(act.time) > 0) {
                activities.push(act);
            }
        })
        data[1].map(act => {
            if (act.name.length > 0 && act.project.length > 0 && parseInt(act.time) > 0) {
                activities.push(act);
            }
        });
        // console.log(activities);
        return await fetch(`${API_URL}/updateReport/`, {
            method: "POST",
            body: JSON.stringify({
                month: month,
                year: year,
                userId: userId,
                activities: activities
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                console.log(res);
                return res;
            })
            .catch(error => {
                console.error(error);
            })

        // console.log(JSON.stringify(data[0].concat(data[1])));
        // console.log(data[0]);
        // console.log(data[1]);

        // const REQUEST_URL = API_URL + `activities/`;
        // return await axios.post(REQUEST_URL, JSON.stringify(data[0].concat(data[1])))
        //     .then(response => {
        //         return response;
        //     })
        //     .catch(error => console.error(error));
    }

    static deleteField = async (id) => {
        return await axios.delete(`${API_URL}/delete/${id}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
            })
    }

    static async getReportActivities(month, year) {
        // console.log(month);
        const userId = authProvider.getUser().id;
        // console.log(userId);
        return await fetch(`${API_URL}/reportActivities/`, {
            method: "POST",
            body: JSON.stringify({
                userId: userId,
                month: parseInt(month),
                year: parseInt(year)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(resJson => {
                console.log(resJson);
                return resJson;
            })
            .catch(error => {
                console.error(error);
            })
    }
    static async getReports(month, year) {
        return await axios.get(`${API_URL}reports/getReportWithDate/?month=${month}&year=${year}&user_id=${authProvider.getUser().id}`, {
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                console.error(error);
            })
    }

    static async getFields() {

    }

    static async getFields(id) {

    }
    
    static async updateField(data) {

    }

    static async deleteField(id) {

    }

}