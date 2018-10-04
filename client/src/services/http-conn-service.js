import axios from "axios";

class HttpService {

    /****************************/
    /*Constants*/
    API_BASE_URL = "http://localhost:1234";
   

    /** Methods */
    apiRequest(method, url, data) {
        return axios({
            method: method,
            url: `${this.API_BASE_URL}/${url}`,
            data: data,
            headers: this.headers
        })
        ;
    }

    getServers () {
        return this.apiRequest("GET", 'allserver')
    }

    createServers (data) {
        return this.apiRequest("POST", 'createserver', data)
    }

    startServers (id) {
        return this.apiRequest("GET", `startserver/${id}`)
    }

    stopServers (id) {
        return this.apiRequest("GET", `stopserver/${id}`)
    }

    createApi (id, data) {
        return this.apiRequest("PUT", `addapi/${id}`, data)
    }

}

export default HttpService;