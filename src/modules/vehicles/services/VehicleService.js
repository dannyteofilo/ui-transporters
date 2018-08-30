import Http from 'services/HttpService';

class VehicleServie {

    getVehicles() {
        return Http.get(`/vehicles`);
    }

    update(id,data={}){
        return Http.put(`/vehicle/${id}`,data)
    }

    create(data={}){
        return Http.post(`/vehicle`,data)
    }

    delete(id){
        return Http.delete(`/vehicle/${id}`)
    }

}

const service = new VehicleServie();

export default service;