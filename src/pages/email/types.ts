export interface IEmail {
  _id: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IEmailStats {
  totalEmail: number;
  todayEmail: number;
  monthEmail: number;
  averageEmail: number;
}

export interface IEmailQueryParams {
  limit?: number | string;
  page?: number | string;
  email?: string;
}
