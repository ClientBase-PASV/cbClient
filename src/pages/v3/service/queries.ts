import { get, patch, post, del } from '@/utils/httpMethods';
import { IService, IServiceQueryParams } from '@/pages/v3/service/types';

export async function queryServiceCreate(payload: any): Promise<any> {
  return post({ url: '/v3/service', data: payload });
}

export async function queryServiceGetById(id: string): Promise<any> {
  return get({ url: `/v3/service/${id}` });
}

export async function queryServiceUpdateById(payload: { serviceId: string; values: IService }): Promise<any> {
  return patch({ url: `/v3/service/${payload.serviceId}`, data: payload.values });
}

export async function queryServiceDeleteById(serviceId: string): Promise<any> {
  return del({ url: `/v3/service/${serviceId}` });
}

export async function queryServiceSearch(payload: IServiceQueryParams): Promise<any> {
  return post({ url: '/v3/service/search', data: payload });
}

export async function queryServiceGetAll(): Promise<any> {
  return get({ url: '/v3/service' });
}

export async function queryServiceGetStats(): Promise<any> {
  return get({ url: `/v3/service/stats` });
}
