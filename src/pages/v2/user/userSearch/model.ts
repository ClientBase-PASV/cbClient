import { Effect, Reducer } from 'umi';
import { IUser } from './types';

import {
  queryUsersSearch,
  queryUsersGetStats,
  queryUsersGetRolesList,
  queryUserUpdateRoleById,
  queryUserVerifyEmailSend,
  queryUserDeleteById,
  queryUserUpdateSlackMemberId,
  queryUserImpersonate,
} from './queries';
import { history } from '@@/core/history';
import { get } from 'lodash';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface UsersDashboardModelType {
  namespace: string;
  state: IState;
  effects: {
    usersSearch: Effect;
    usersGetStats: Effect;
    usersGetRolesList: Effect;
    usersUpdateRoleById: Effect;
    userVerifyEmailSend: Effect;
    userDeleteById: Effect;
    userGetSlackId: Effect;
    userImpersonate: Effect;
    userImpersonateGetBack: Effect;
    reset: Effect;
  };

  reducers: {
    save: Reducer<IState>;
    removeUserFromUsersList: Reducer<IState>;
  };
}

const UsersModel: UsersDashboardModelType = {
  namespace: 'v2UsersDashboard',

  state: {},

  effects: {
    *usersSearch({ payload }, { call, put }) {
      const data = yield call(queryUsersSearch, payload);
      yield put({
        type: 'save',
        payload: { usersList: data.items, usersPagination: data.pagination },
      });
    },

    *usersGetStats(_, { call, put }) {
      const data = yield call(queryUsersGetStats);
      yield put({
        type: 'save',
        payload: { usersStats: data.payload },
      });
    },

    *usersGetRolesList(_, { call, put }) {
      const data = yield call(queryUsersGetRolesList);
      yield put({
        type: 'save',
        payload: { usersRolesList: data.payload },
      });
    },

    *usersUpdateRoleById({ payload }, { call, put }) {
      yield call(queryUserUpdateRoleById, payload);
      yield put({ type: 'usersGetStats' });
    },

    *userVerifyEmailSend({ payload }, { call }) {
      yield call(queryUserVerifyEmailSend, payload);
    },

    *userDeleteById({ payload }, { call, put }) {
      yield put({ type: 'Sidepanel/close' });
      yield call(queryUserDeleteById, payload);
      yield put({
        type: 'removeUserFromUsersList',
        payload: payload,
      });
      yield put({ type: 'usersGetStats' });
    },

    *userGetSlackId({ payload }, { call, put }) {
      yield call(queryUserUpdateSlackMemberId, payload.userId);
    },

    *userImpersonate({ payload }, { call, put }) {
      const data = yield call(queryUserImpersonate, payload.userId);
      const userId = get(data, 'userId');
      const token = get(data, 'token');

      yield put({ type: 'User/reset' });
      yield put({ type: 'User/reset' });
      yield put({ type: 'reset' });

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      history.push(`/profile/${userId}`);
      yield put({ type: 'User/auth' });
    },

    *userImpersonateGetBack({ payload }, { put }) {
      const adminToken = get(payload, 'adminToken', '');
      const adminId = get(payload, 'adminId', '');

      localStorage.setItem('token', adminToken);
      localStorage.setItem('userId', adminId);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminId');

      history.push(`/profile/${adminId}`);
      yield put({ type: 'User/auth' });
      yield put({ type: 'User/userGetById', payload: adminId });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,

    removeUserFromUsersList(state: any | undefined, { payload }) {
      const newUsersList = state.usersList.filter((el: IUser) => el._id !== payload);
      return {
        ...state,
        usersList: newUsersList,
      };
    },
  },
};

export default UsersModel;
