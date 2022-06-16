import { apiFetch } from './api-fetch';
import { requestUrl } from './url';

export const getBestTop100List = async (sort?: string) => {
    let url = `${requestUrl}/best/top100`;
    if(sort=== 'likeCnt' || sort === 'replyCnt' || sort ==='ranking') url += `?sort=${sort}`;
    else if(sort=== 'increaseRank' || sort === 'decreaseRank' || sort ==='sale') url += `?filter=${sort}`;
    return await apiFetch(url, 'get');
};

export const getBestRankings = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/best/rankings/${item_info_id}`, 'get');
};

export const getBestCategory = async (url:string) => {
    return await apiFetch(`${requestUrl}/best/category${url}`, 'get');
};

export const getBestBrand = async (url:string) => {
    return await apiFetch(`${requestUrl}/best/brand${url}`, 'get');
};

export const getBestByRanking = async (url:string) => {
    return await apiFetch(`${requestUrl}/best/ranking${url}`, 'get');
};

export const getCurrent3DaysBestTop5 = async () => {
    return await apiFetch(`${requestUrl}/best/rankings/top5`, 'get');
};

