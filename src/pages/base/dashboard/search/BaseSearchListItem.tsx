import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IBase } from '../../types';

interface IProps extends IBase {
  baseDelete: (id: String) => void;
}

const BaseSearchListItem = (props: IProps) => {
  const { baseDelete } = props;

  const owner = get(props, 'item.owner', '');
  const baseId = get(props, 'item._id', '');
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
        <Button danger onClick={() => baseDelete(baseId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  baseDelete: (payload: any) => dispatch({ type: 'BaseDashboard/baseDelete', payload }),
});

export default connect(null, mapDispatchToProps)(BaseSearchListItem);
