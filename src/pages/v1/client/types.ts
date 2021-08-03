export interface IClient {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IClientStats {
  totalClient: number;
  todayClient: number;
  monthClient: number;
  averageClient: number;
}

export interface IClientQueryParams {
  limit?: number | string;
  page?: number | string;
  clientSearchParam1?: string;
  clientSearchParam2?: string;
}
