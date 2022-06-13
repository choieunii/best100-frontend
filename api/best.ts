import { apiFetch } from './api-fetch';
import { requestUrl } from './url';


export const getBestTop100List = async (sort?: string) => {
    let url = `${requestUrl}/best/top100`;
    if(sort) url += `?sort=${sort}`;
    return await apiFetch(url, 'get');
};

export const getBestRankings = async (item_info_id: any) => {
    return await apiFetch(`${requestUrl}/best/rankings/${item_info_id}`, 'get');
};
