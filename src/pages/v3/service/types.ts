export interface IService {
  _id: string;
  clientPrice: number;
  vendorPrice: number;
  name: string;
  vendor: {
    name: string;
    _id: string;
  };
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IServiceStats {
  totalService: number;
  todayService: number;
  monthService: number;
  averageService: number;
}

export interface IServiceQueryParams {
  limit?: number | string;
  page?: number | string;
  serviceSearchParam1?: string;
  serviceSearchParam2?: string;
}
