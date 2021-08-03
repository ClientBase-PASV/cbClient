import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  orderId: string;
  name: string;
  orderGetById: (id: string) => void;
}

const OrderView = (props: IProps) => {
  const orderId = get(props, 'match.params.orderId');
  const name = get(props, 'Order.name', '');

  console.log(props);

  useEffect(() => {
    props.orderGetById(orderId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Order: state.v1Order,
});

const mapDispatchToProps = (dispatch: any) => ({
  orderGetById: (payload: string) => dispatch({ type: 'v1Order/getById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
