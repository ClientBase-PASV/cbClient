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
  const name = get(props, 'VendorView.name', '');

  console.log(props);

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
  VendorView: state.VendorView,
});

const mapDispatchToProps = (dispatch: any) => ({
  vendorGetById: (payload: string) => dispatch({ type: 'VendorView/vendorGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorView);
