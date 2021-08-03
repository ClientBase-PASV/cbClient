import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IClient } from '@/pages/v1/client/types';

interface IProps extends IClient {
  clientDelete: (id: String) => void;
}

const ClientSearchListItem = (props: IProps) => {
  const { clientDelete } = props;

  const owner = get(props, 'item.owner', '');
  const clientId = get(props, 'item._id', '');
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
        <Button danger onClick={() => clientDelete(clientId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  clientDelete: (payload: any) => dispatch({ type: 'v1Client/clientDelete', payload }),
});

export default connect(null, mapDispatchToProps)(ClientSearchListItem);
