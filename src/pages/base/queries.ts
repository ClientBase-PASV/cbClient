import { get, patch, post, del } from '@/utils/httpMethods';
import { IBase, IBaseQueryParams } from './types';

export async function queryBaseCreate(payload: any): Promise<any> {
  return post({ url: '/base', data: payload });
}

export async function queryBaseGetById(id: string): Promise<any> {
  return get({ url: `/base/${id}` });
}

export async function queryBaseUpdateById(payload: { baseId: string; values: IBase }): Promise<any> {
  return patch({ url: `/base/${payload.baseId}`, data: payload.values });
}

export async function queryBaseDeleteById(baseId: string): Promise<any> {
  return del({ url: `/base/${baseId}` });
}

export async function queryBaseSearch(payload: IBaseQueryParams): Promise<any> {
  return post({ url: '/base/search', data: payload });
}

export async function queryBaseGetAll(): Promise<any> {
  return get({ url: '/base' });
}

export async function queryBaseGetStats(): Promise<any> {
  return get({ url: `/base/stats` });
}
