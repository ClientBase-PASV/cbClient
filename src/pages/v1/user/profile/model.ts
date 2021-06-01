import { Effect, Reducer } from 'umi';

import { queryUserGetById } from '@/pages/user/queries';
import { ICurrentUser } from '@/pages/user/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IUserModelState {
  userInfo?: ICurrentUser;
}

export interface IUserModel {
  namespace: string;
  state: IUserModelState;
  effects: {
    userGetById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IUserModelState>;
  };
}

const UserModel: IUserModel = {
  namespace: 'v1Profile',

  state: {},

  effects: {
    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },

    *userGetById({ payload }, { call, put }) {
      const response = yield call(queryUserGetById, payload);
      yield put({
        type: 'save',
        payload: { userInfo: response },
      });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default UserModel;
