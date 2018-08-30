import Http from 'services/HttpService';

class DriverServie {

    getDrivers() {
        return Http.get(`/drivers`);
    }

    update(id,data={}){
        return Http.put(`/driver/${id}`,data)
    }

    create(data={}){
        return Http.post(`/driver`,data)
    }

    delete(id){
        return Http.delete(`/driver/${id}`)
    }

}

const service = new DriverServie();

export default service;