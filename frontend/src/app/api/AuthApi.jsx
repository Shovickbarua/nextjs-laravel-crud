import axios from "../axios/Axios";


const AuthApi = () => {};

AuthApi.login = async (data) => {
    const url = "/api/login";
    const res = await axios.post(url, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
    return res;
};

AuthApi.register = async (data) => {
    let url = "/api/register";
    const res = await axios.post(url, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

AuthApi.logout = async () => {
    let url = "/api/logout";
    const res = await axios.post(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

export default AuthApi;