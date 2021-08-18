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
  queryUserGetById,
  queryUserVerifyEmailSend,
} from '@/pages/v3/user/queries';

import { IUserAccount } from './userSearch/types';

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
    userGetById: Effect;
    userVerifyEmailSend: Effect;
  };
  reducers: {
    save: Reducer<IUserAccount>;
  };
}

const initialState = {};

const UserModel: UserModelType = {
  namespace: 'v3User',

  state: initialState,

  effects: {
    *auth(_, { call, put }) {
      const token = localStorage.getItem('token');

      if (token) {
        const userAuthResult = yield call(queryUserAuth);

        if (userAuthResult instanceof Error) {
          yield put({ type: 'logout' });
        }

        yield put({ type: 'save', payload: userAuthResult.payload });
      }
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },

    *login({ payload }, { call, put }) {
      const data = yield call(queryUserLogin, payload);
      const userId = get(data, 'payload.userId', '');
      const name = get(data, 'payload.user.name');
      const token = get(data, 'payload.token');

      if (name && token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        yield put({ type: 'auth' });

        const emailConfirmed = get(data, 'payload.user.emailConfirmation.confirmed', false);

        if (!emailConfirmed) history.push('/v3/onboarding');
        else history.push('/v3/client');
      }
    },

    *register({ payload, version }, { call, put }) {
      const createResult = yield call(queryUserRegister, payload, version);
      if (!(createResult instanceof Error)) {
        notification.destroy();
        yield put({ type: 'login', payload });
        history.push('/v3/onboarding');
      }
    },

    *logout(_, { put }) {
      localStorage.clear();
      yield put({ type: 'set', payload: {} });
      history.push('/v3/user/login');
    },

    *passwordReset({ payload }, { call }) {
      yield call(queryUserPasswordReset, payload);
      history.push('/v3/user/password/reset/mailed');
    },

    *passwordResetNew({ payload }, { call }) {
      const result = yield call(queryUserPasswordResetNew, payload);
      if (!(result instanceof Error)) {
        history.push('/v3/user/login');
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

    *userGetById({ payload }, { call, put }) {
      const response = yield call(queryUserGetById, payload);
      yield put({
        type: 'save',
        payload: { userInfo: response },
      });
    },

    *userVerifyEmailSend({ payload }, { call }) {
      yield call(queryUserVerifyEmailSend, payload);
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default UserModel;
