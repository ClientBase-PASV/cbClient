import { Effect, Reducer } from 'umi';

import { queryVendorGetById } from '@/pages/v1/vendor/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    vendorGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'VendorView',

  state: {},

  effects: {
    *vendorGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryVendorGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *vendorDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryVendorDeleteById, payload.vendorId);
    //   yield put({ type: 'vendorSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
