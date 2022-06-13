import { apiFetch } from './api-fetch';
import { requestUrl } from './url';

export type updatePostProps = {
    title: string;
    text: string;
    date: string;
};

export const getItemInfo = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/item/${item_info_id}`, 'get');
}

export const UpdateItemLikeCnt = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/item/like/${item_info_id}`, 'post');
};
