import Http from 'services/HttpService';

class TravelServie {

    getTravels() {
        return Http.get(`/travels`);
    }

    update(id,data={}){
        return Http.put(`/travel/${id}`,data)
    }

    create(data={}){
        return Http.post(`/travel`,data)
    }

    delete(id){
        return Http.delete(`/travel/${id}`)
    }

}

const service = new TravelServie();

export default service;