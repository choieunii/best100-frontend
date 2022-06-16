import { apiFetch } from './api-fetch';
import { requestUrl } from './url';


export const getItemInfo = async (item_info_id: string | string[] | undefined ) => {
    return await apiFetch(`${requestUrl}/item/${item_info_id}`, 'get');
}

export const updateItemLikeCnt = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/item/like/${item_info_id}`, 'post');
};

export const itemSearch = async (name: string) => {
    let url = `${requestUrl}/item/search`;
    if(name) url += `?itemName=${name}`;
    return await apiFetch(url, 'get');
};
