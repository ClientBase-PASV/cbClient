import { get, patch, post, del } from '@/utils/httpMethods';
import { IVendor, IVendorQueryParams } from '@/pages/v1/vendor/types';

export async function queryVendorCreate(payload: any): Promise<any> {
  return post({ url: '/vendor', data: payload });
}

export async function queryVendorGetById(id: string): Promise<any> {
  return get({ url: `/vendor/${id}` });
}

export async function queryVendorUpdateById(payload: { vendorId: string; values: IVendor }): Promise<any> {
  return patch({ url: `/vendor/${payload.vendorId}`, data: payload.values });
}

export async function queryVendorDeleteById(vendorId: string): Promise<any> {
  return del({ url: `/vendor/${vendorId}` });
}

export async function queryVendorSearch(payload: IVendorQueryParams): Promise<any> {
  return post({ url: '/vendor/search', data: payload });
}

export async function queryVendorGetAll(): Promise<any> {
  return get({ url: '/vendor' });
}

export async function queryVendorGetStats(): Promise<any> {
  return get({ url: `/vendor/stats` });
}
