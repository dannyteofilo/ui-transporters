import Http from 'services/HttpService';

class VehicleServie {

    getVehicles() {
        return Http.get(`/vehicles`);
    }

    update(id,data={}){
        return Http.put(`/vehicle/${id}`,data)
    }

    create(data={}){
        console.log('Data: ',data)
        return Http.post(`/vehicle`,data)
    }

}

const service = new VehicleServie();

export default service;