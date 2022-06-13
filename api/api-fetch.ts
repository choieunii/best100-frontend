type FetchType = 'post' | 'get' | 'put' | 'delete';

export const apiFetch = async (
    url: string,
    type: FetchType,
    body?: any,
    formData?: boolean,
) => {
    let headers;

    if (formData) {
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        };
    } else {
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        };
    }
    return await fetch(url, {
        method: type,
        headers,
        body: formData ? body : JSON.stringify(body),
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            return err;
        });
};
