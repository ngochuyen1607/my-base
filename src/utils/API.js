import axios from "axios";
import queryString from "query-string";

axios.defaults.baseURL = process.env.REACT_APP_API_URL_BASE;

const handleResponseSuccess = response => new Promise((resolve) => resolve(response.data))

const handleErrors = response => new Promise((resolve, reject) => {
    // handle errors 400, 500, 403, 401
    return reject(response)
})

const API = {
    callWithHeader: token => {
        const headers = { 'content-Type': 'application/json; utf-8' };
        if (token) {
            return { ...headers, Authorization: `Bearer ${token}` };
        }
        return headers;
    },

    get: async ({ endpoint, body, token = ''}) => {
        let response;
        const query = queryString.stringify(body, { arrayFormat: 'comma' });
        let apiUrl = endpoint;

        if (query) { 
            apiUrl = `${endpoint}?${query}`;
        }

        try {
            response = await axios({
                method: 'GET',
                url: apiUrl,
                headers: API.callWithHeader(token),
            });
            return handleResponseSuccess(response);
        } catch (error) {
            return handleErrors(error.response);
        }
    },

    post:  async ({ endpoint, body, token = ''}) => {
        let response;

        try {
            response = await axios({
                method: 'POST',
                url: endpoint,
                headers: API.callWithHeader(token),
                data: JSON.stringify({ ...body }),
            });
            return handleResponseSuccess(response);
        } catch (error) {
            return handleErrors(error.response);
        }
    },

    put: async ({ endpoint, body, token = '' }) => {
        let response;

        try {
            response = await axios({
                method: 'PUT',
                url: endpoint,
                headers: API.callWithHeader(token),
                data: JSON.stringify({ ...body }),
            });
            return handleResponseSuccess(response);
        } catch (error) {
            return handleErrors(error.response);
        }
    },

    delete: async ({endpoint, token = ''}) => {
        let response;

        try {
            response = await axios({
                method: 'DELETE',
                url: endpoint,
                headers: API.callWithHeader(token),
            });
            return handleResponseSuccess(response);
        } catch (error) {
            return handleErrors(error.response);
        }
    }
}

export default API;
