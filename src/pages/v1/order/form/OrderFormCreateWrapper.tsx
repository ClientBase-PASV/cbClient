import React from 'react';
import { connect } from 'umi';
import OrderForm from '@/pages/v1/order/form/OrderForm';
import { IOrder } from '@/pages/v1/order/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IOrder) => void;
  loadingEffects: ILoadingEffects;
}

const OrderFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IOrder) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.v1Order/create', false);

  return <OrderForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IOrder) => dispatch({ type: 'v1Order/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderFormCreateWrapper);
