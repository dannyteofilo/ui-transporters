import Http from 'services/HttpService';

class StatsServie {

    getStats() {
        return Http.get(`/stats`);
    }

}

const service = new StatsServie();

export default service;