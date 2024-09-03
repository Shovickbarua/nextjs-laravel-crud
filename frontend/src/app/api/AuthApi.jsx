import axios from "axios";

const AuthApi = () => {};

AuthApi.login = async (data) => {
    const url = "http://127.0.0.1:3000/api/login";
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
    let url = "http://127.0.0.1:3000/api/register";
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