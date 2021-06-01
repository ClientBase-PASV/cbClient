import { Effect, Reducer } from 'umi';
import { get } from 'lodash';
import { history } from 'umi';
import { notification } from 'antd';

import defaultReducers from '@/utils/defaultReducers';

import {
  queryUserLogin,
  queryUserRegister,
  queryUserPasswordReset,
  queryIsValidResetPasswordLink,
  queryUserPasswordResetNew,
  queryUserAuth,
  queryUserEmailVerify,
  queryUserSendSupportEmail,
} from '@/pages/user/queries';

import { IUserAccount } from '@/pages/user/userSearch/types';

export interface UserModelType {
  namespace: string;
  state: {} | IUserAccount;
  effects: {
    reset: Effect;
    login: Effect;
    register: Effect;
    auth: Effect;
    logout: Effect;
    passwordReset: Effect;
    passwordResetNew: Effect;
    isValidResetPasswordLink: Effect;
    emailVerify: Effect;
  };
  reducers: {
    save: Reducer<IUserAccount>;
  };
}

const initialState = {};

const UserModel: UserModelType = {
  namespace: 'v1Account',

  state: initialState,

  effects: {
    *auth(_, { call, put }) {
      const token = localStorage.getItem('token');

      if (token) {
        const userAuthResult = yield call(queryUserAuth);

        if (userAuthResult instanceof Error) {
          yield put({ type: 'logout' });
        }

        const emailConfirmed = get(userAuthResult, 'payload.emailConfirmation.confirmed');
        const companyAccount = get(userAuthResult, 'payload.companyAccount');

        if (!companyAccount && !emailConfirmed) {
          history.push('/v1/wizard');
        }

        if (userAuthResult) {
          yield put({
            type: 'save',
            payload: userAuthResult.payload,
          });
        } else {
          yield put({ type: 'logout' });
        }
      }
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },

    *login({ payload }, { call, put }) {
      const data = yield call(queryUserLogin, payload);

      const userId = get(data, 'userId', '');
      const name = get(data, 'user.name');
      const token = get(data, 'token');

      if (name && token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        history.push(`/profile/${userId}`);

        yield put({ type: 'auth' });
      }
    },

    *register({ payload, version }, { call, put }) {
      const createResult = yield call(queryUserRegister, payload, version);
      if (!(createResult instanceof Error)) {
        notification.destroy();
        yield put({ type: 'login', payload });
        history.push('/v1/wizard');
      }
    },

    *logout(_, { put }) {
      localStorage.clear();
      yield put({ type: 'set', payload: {} });
      history.push('/v1/user/login');
    },

    *passwordReset({ payload }, { call }) {
      yield call(queryUserPasswordReset, payload);
      history.push('/v1/user/password/reset/mailed');
    },

    *passwordResetNew({ payload }, { call }) {
      const result = yield call(queryUserPasswordResetNew, payload);
      if (!(result instanceof Error)) {
        history.push('/v1/user/login');
      }
    },

    *isValidResetPasswordLink({ payload }, { call, put }) {
      const result = yield call(queryIsValidResetPasswordLink, payload);
      if (!(result instanceof Error)) {
        yield put({ type: 'save', payload: { isValidResetLink: result.success } });
      }
    },

    *emailVerify({ payload }, { call }) {
      yield call(queryUserEmailVerify, payload);
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default UserModel;
