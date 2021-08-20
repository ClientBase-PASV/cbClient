import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IVendor } from '@/pages/v4/vendor/types';

interface IProps extends IVendor {
  vendorDelete: (id: String) => void;
}

const VendorSearchListItem = (props: IProps) => {
  const { vendorDelete } = props;

  const owner = get(props, 'item.owner', '');
  const vendorId = get(props, 'item._id', '');
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
        <Button danger onClick={() => vendorDelete(vendorId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  vendorDelete: (payload: any) => dispatch({ type: 'v4Vendor/vendorDelete', payload }),
});

export default connect(null, mapDispatchToProps)(VendorSearchListItem);
