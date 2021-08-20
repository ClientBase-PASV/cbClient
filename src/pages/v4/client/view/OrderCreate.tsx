import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const OrderCreate = (props: IProps) => {
  const orderCreate = () => {
    props.open({
      title: 'Create new Order',
      component: 'v4OrderFormCreate',
      place: 'ClientView',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={orderCreate}>
      Create Order
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(OrderCreate);
