import axios from 'axios';
import authProvider from '../account/authProvider';

//Clasa asta contine metode statice prin care facem request-uri catre baza de date

const API_URL = "https://api.davinci.fun/appmos-server/activities";
// const API_URL = "https://api.amosed.ro/api/reports/";
export default class ReportOperations {

    static async addActivity(data, month, year) {
        const userId = authProvider.getUser().id;
        const activities = [];
        data[0].map(act => {
            if (act.name.length > 0 && act.project.length > 0 && parseInt(act.time) > 0) {
                activities.push(act);
            }
        })
        data[1].map(act => {
            if (act.name.length > 0 && act.project.length > 0 && parseInt(act.time) > 0) {
                activities.push(act);
            }
        });
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
                return res;
            })
            .catch(error => {
                console.error(error);
            })

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
        const userId = authProvider.getUser().id;
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