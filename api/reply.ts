import { apiFetch } from './api-fetch';
import { requestUrl } from './url';

export const getPagingReplyList = async (
    item_info_id: string,
    page?: number,
    sort?: string,
) => {
    let url = `${requestUrl}/replies/${item_info_id}`;
    if (page) {
        url += `?page=${page}`;
        if (sort) url += `&sort=${sort}`;
    } else {
        if (sort) url += `?sort=${sort},desc`;
    }
    return await apiFetch(url, 'get');
};

export const getReply = async (reply_id: any) => {
    return await apiFetch(`${requestUrl}/reply/${reply_id}`, 'get');
};

export const getReplyTopLikeCntAndHateCnt = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/reply/top/${item_info_id}`, 'get');
};

export const createReply = async (
    itemInfoId?: string,
    content?: string,
    password?: string,
    hasPassword?: boolean,
) => {
    return await apiFetch(`${requestUrl}/reply`, 'post', {
        itemInfoId,
        content,
        password,
        hasPassword,
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

export const deleteReply = async (reply_id: Number, password: string) => {
    return await apiFetch(`${requestUrl}/reply/${reply_id}`, 'post', {
        password,
    });
};

export const getTopLikeAndHateReply = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/reply/top/${item_info_id}`, 'get');
};
