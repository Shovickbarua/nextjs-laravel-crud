import axios from "../axios/Axios";


const InventoryApi = () => {};

InventoryApi.index = async () => {
    const url = "/api/inventory";
    const res = await axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

InventoryApi.save = async (data) => {
    let url = "/api/inventory";
    if (data.id) url = "/api/inventory/" + data.id + "?_method=PUT";
    const res = await axios.post(url, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

InventoryApi.show = async (id) => {
    const url = "/api/inventory/" + id;
    const res = await axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

InventoryApi.delete = async (id) => {
    const url = "/api/inventory/" + id;
    const res = await axios.delete(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

export default InventoryApi;