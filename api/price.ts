import { apiFetch } from './api-fetch';
import { requestUrl } from './url';

export const getItemPrices = async (item_info_id: string) => {
    return await apiFetch(`${requestUrl}/prices/${item_info_id}`, 'get');
};
