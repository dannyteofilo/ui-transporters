import Http from 'services/HttpService';

class UserServie {

    getAvatar(image) {
        return Http.get(`/get-image-user/${image}`);
    }

}

const service = new UserServie();

export default service;