import { Effect, Reducer } from 'umi';
import { queryUserAuth, queryUserUpdateById, queryUserPasswordUpdate } from '@/pages/v2/user/queries';
import defaultReducers from '@/utils/defaultReducers';
import { IUser } from '@/pages/v2/user/userSearch/types';

export interface IUserModelState {
  userInfo?: IUser;
}

export interface IUserModelType {
  namespace: string;
  state: IUserModelState;
  effects: {
    userGetInfo: Effect;
    reset: Effect;
    userUpdateById: Effect;
    updatePassword: Effect;
  };
  reducers: {
    save: Reducer<IUserModelState>;
  };
}

const UserModel: IUserModelType = {
  namespace: 'v2Settings',

  state: {},

  effects: {
    *userGetInfo(_, { call, put }) {
      const data = yield call(queryUserAuth);
      yield put({ type: 'save', payload: { userInfo: data.payload } });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: {} });
    },

    *userUpdateById({ payload }, { call, put }) {
      const response = yield call(queryUserUpdateById, payload);
      yield put({ type: 'save', payload: response.data });
      yield put({ type: 'userGetInfo' });
    },

    *updatePassword({ payload }, { call, put }) {
      const response = yield call(queryUserPasswordUpdate, payload);
      yield put({ type: 'save', payload: response.data });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default UserModel;
