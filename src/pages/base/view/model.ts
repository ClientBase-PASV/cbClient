import { Effect, Reducer } from 'umi';

import { queryBaseGetById } from '../queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    baseGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'BaseView',

  state: {},

  effects: {
    *baseGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryBaseGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *baseDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryBaseDeleteById, payload.baseId);
    //   yield put({ type: 'baseSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
