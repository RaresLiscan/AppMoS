import axios from 'axios';

const API_URL = "http://localhost/rapoarte/"
export default class ReportOperations {

    static async addActivity(profData, selfDevData) {
        let dataArray = [];

        profData.map(data => {
            let dataObj = data;
            dataObj.type = 1;
            dataArray.push(dataObj);
        })

        selfDevData.map(data => {
            let dataObj = data;
            dataObj.type = 2;
            dataArray.push(dataObj);
        })

        const REQUEST_URL = API_URL + `activities/`;

        console.log(JSON.stringify(dataArray));
        // return await axios.post(REQUEST_URL, JSON.stringify(dataArray))
        //     .then(response => {
        //         return response;
        //     })
        //     .catch(error => console.error(error));
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