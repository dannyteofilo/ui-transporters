import axios from 'axios';

class Http {

    constructor() {

        this.axios = axios.create();

    }

    request(config) {
        return this.axios.request(config);
    }

    get(url, config = {}) {
        return this.axios.get(url, this.getConfig(config));
    }

    delete(url, config = {}) {
        return this.axios.delete(url, this.getConfig(config));
    }


    post(url, data = {}, config = {}) {
        return this.axios.post(url, data, this.getConfig(config))
    }

    put(url, data = {}, config = {}) {
        return this.axios.put(url, data, this.getConfig(config))
    }


    getConfig(config) {
        config = config ? { ...config } : {};

        config.baseURL = process.env.REACT_APP_API_URL;

        return config;
    }

}

const http = new Http();

export default http;