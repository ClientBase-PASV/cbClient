import { get, patch, post, del } from '@/utils/httpMethods';
import { IOrder, IOrderQueryParams } from '@/pages/v3/order/types';

export async function queryOrderCreate(payload: any): Promise<any> {
  return post({ url: '/v3/order', data: payload });
}

export async function queryOrderGetById(id: string): Promise<any> {
  return get({ url: `/v3/order/${id}` });
}

export async function queryOrderUpdateById(payload: { orderId: string; values: IOrder }): Promise<any> {
  return patch({ url: `/v3/order/${payload.orderId}`, data: payload.values });
}

export async function queryOrderDeleteById(orderId: string): Promise<any> {
  return del({ url: `/v3/order/${orderId}` });
}

export async function queryOrderSearch(payload: IOrderQueryParams): Promise<any> {
  return post({ url: '/v3/order/search', data: payload });
}

export async function queryOrderGetStats(): Promise<any> {
  return get({ url: `/v3/order/stats` });
}
