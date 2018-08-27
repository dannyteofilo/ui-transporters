import Http from 'services/HttpService';

class VehicleServie {

    getVehicles() {
        return Http.get(`/vehicles`);
    }

}

const service = new VehicleServie();

export default service;