import axios from 'axios';
import authProvider from '../account/authProvider';

//Clasa asta contine metode statice prin care facem request-uri catre baza de date

//TODO:
/*

    1. request la /activities/ cu un array continand obiecte de tip ReportField
    2. La report fields trebuie setat fiecare report_id si user_id

*/

// const API_URL = "http://localhost/rapoarte/";
const API_URL = "https://api.amosed.ro/api/reports/";
export default class ReportOperations {

    static async addActivity(data) {

        const REQUEST_URL = API_URL + `activities/`;

        // console.log(JSON.stringify(data[0].concat(data[1])));
        return await axios.post(REQUEST_URL, JSON.stringify(data[0].concat(data[1])))
            .then(response => {
                return response;
            })
            .catch(error => console.error(error));
    }

    static deleteField = async (id) => {
        return await axios.delete(`${API_URL}activities/?id=${id}`)
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
                return error;
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