import { get, patch, post, del } from '@/utils/httpMethods';
import { IClient, IClientQueryParams } from '@/pages/v1/client/types';

export async function queryClientCreate(payload: any): Promise<any> {
  return post({ url: '/v1/client', data: payload });
}

export async function queryClientGetById(id: string): Promise<any> {
  return get({ url: `/v1/client/${id}` });
}

export async function queryClientUpdateById(payload: { clientId: string; values: IClient }): Promise<any> {
  return patch({ url: `/v1/client/${payload.clientId}`, data: payload.values });
}

export async function queryClientDeleteById(clientId: string): Promise<any> {
  return del({ url: `/v1/client/${clientId}` });
}

export async function queryClientSearch(payload: IClientQueryParams): Promise<any> {
  return post({ url: '/v1/client/search', data: payload });
}

export async function queryClientGetAll(): Promise<any> {
  return get({ url: '/v1/client' });
}

export async function queryClientGetStats(): Promise<any> {
  return get({ url: `/v1/client/stats` });
}
