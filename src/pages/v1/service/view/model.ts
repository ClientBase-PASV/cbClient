import { Effect, Reducer } from 'umi';

import { queryServiceGetById } from '@/pages/v1/service/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    serviceGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ServiceView',

  state: {},

  effects: {
    *serviceGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryServiceGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *serviceDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryServiceDeleteById, payload.serviceId);
    //   yield put({ type: 'serviceSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
