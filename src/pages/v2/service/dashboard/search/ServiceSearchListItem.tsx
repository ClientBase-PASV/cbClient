import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IService } from '@/pages/v2/service/types';

interface IProps extends IService {
  serviceDelete: (id: String) => void;
}

const ServiceSearchListItem = (props: IProps) => {
  const { serviceDelete } = props;

  const owner = get(props, 'item.owner', '');
  const serviceId = get(props, 'item._id', '');
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
        <Button danger onClick={() => serviceDelete(serviceId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  serviceDelete: (payload: any) => dispatch({ type: 'ServiceDashboard/serviceDelete', payload }),
});

export default connect(null, mapDispatchToProps)(ServiceSearchListItem);
