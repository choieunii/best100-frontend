import { apiFetch } from './api-fetch';
import { requestUrl } from './url';


export const getPagingReplyList = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/reply/${item_info_id}`, 'get');
};

export const getReply = async (reply_id: any) => {
    return await apiFetch(`${requestUrl}/reply/${reply_id}`, 'get');
};

export const getReplyTopLikeCntAndHateCnt = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/reply/top/${item_info_id}`, 'get');
};

export const createReply = async (
    item_info_id: string,
    content: string,
    password?: string,
) => {
    return await apiFetch(`${requestUrl}/reply`, 'post', {
        item_info_id,
        content,
        password,
    });
};

export const updateReplyLikeCnt = async (reply_id: Number) => {
    return await apiFetch(`${requestUrl}/reply/like/${reply_id}`, 'post');
};

export const updateReplyHateCnt = async (reply_id: Number) => {
    return await apiFetch(`${requestUrl}/reply/hate/${reply_id}`, 'post');
};

export const updateReply = async (
    reply_id: Number,
    content: string,
    password?: string,
) => {
    return await apiFetch(`${requestUrl}/reply/${reply_id}`, 'put', {
        content,
        password,
    });
};

export const deleteReply = async (reply_id: Number) => {
    return await apiFetch(`${requestUrl}/reply/${reply_id}`, 'delete');
};
