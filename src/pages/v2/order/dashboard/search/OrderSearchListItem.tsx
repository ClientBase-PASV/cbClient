import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IOrder } from '@/pages/v2/order/types';

interface IProps extends IOrder {
  orderDelete: (id: String) => void;
}

const OrderSearchListItem = (props: IProps) => {
  const { orderDelete } = props;

  const owner = get(props, 'item.owner', '');
  const orderId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <Row>
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </Row>

      <Row>{description}</Row>

      <Row>
        <Button danger onClick={() => orderDelete(orderId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  orderDelete: (payload: any) => dispatch({ type: 'v2Order/orderDelete', payload }),
});

export default connect(null, mapDispatchToProps)(OrderSearchListItem);
