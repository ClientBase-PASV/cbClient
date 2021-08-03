import { Effect, history, Reducer } from 'umi';

import { queryBaseCreate, queryBaseGetById, queryBaseUpdateById } from '../queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface BaseModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const BaseModel: BaseModelType = {
  namespace: 'BaseForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryBaseCreate, payload);
      yield put({ type: 'BaseDashboard/baseSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/base');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { baseInfo: {} } });
      const data = yield call(queryBaseGetById, payload);
      yield put({ type: 'save', payload: { baseInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryBaseUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'BaseDashboard/baseSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default BaseModel;
