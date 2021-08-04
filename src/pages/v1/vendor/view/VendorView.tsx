import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  vendorId: string;
  name: string;
  vendorGetById: (id: string) => void;
}

const VendorView = (props: IProps) => {
  const vendorId = get(props, 'match.params.vendorId');
  const name = get(props, 'Vendor.name', '');

  useEffect(() => {
    props.vendorGetById(vendorId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Vendor: state.v1Vendor,
});

const mapDispatchToProps = (dispatch: any) => ({
  vendorGetById: (payload: string) => dispatch({ type: 'v1Vendor/vendorGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorView);
