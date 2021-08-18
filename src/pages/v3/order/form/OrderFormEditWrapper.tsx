import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import OrderForm from '@/pages/v3/order/form/OrderForm';
import { IOrder } from '@/pages/v3/order/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (orderId: string) => void;
  reset: () => void;
  updateById: any;
  orderInfo: IOrder;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const OrderFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const orderId: string = get(props, 'Sidepanel.orderId', '');

  const isLoadingGet = get(props, 'loadingEffects.v3Order/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.v3Order/updateById', false);

  useEffect(() => {
    props.getById(orderId);
  }, []);

  const onFinish = (values: IOrder) => {
    props.updateById({ values, orderId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <OrderForm
      onFinish={onFinish}
      initialValues={props.orderInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
  orderInfo: state.v3Order,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'v3Order/reset' }),
  updateById: (payload: IOrder) => dispatch({ type: 'v3Order/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'v3Order/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderFormEditWrapper));
