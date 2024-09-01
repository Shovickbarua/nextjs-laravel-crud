const ItemApi = () => {};

ItemApi.index = async () => {
    const url = "/api/item/";
    const res = await axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

ItemApi.save = async (data) => {
    let url = "/api/item/";
    if (data.get('id')) url = "/api/item/" + data.get('id') + "?_method=PUT";
    const res = await axios.post(url, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

ItemApi.show = async (id) => {
    const url = "/api/item/" + id;
    const res = await axios.get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

ItemApi.delete = async (id) => {
    const url = "/api/item/" + id;
    const res = await axios.delete(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

export default ItemApi;