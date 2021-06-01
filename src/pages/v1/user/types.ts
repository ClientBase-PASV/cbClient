export interface ICurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userId?: string;
  unreadCount?: number;
}

export interface IUpdatePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IValidResetPasswordLink {
  userId: string;
  hash: string;
}

export interface IResetPasswordArg {
  userId: string;
  hash: string;
  password: string;
}
