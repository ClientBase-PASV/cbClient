import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const VendorDashboardControls = (props: IProps) => {
  const vendorCreate = () => {
    props.open({
      title: 'Create new Vendor',
      component: 'VendorFormCreate',
      place: 'VendorDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={vendorCreate}>
      Create Vendor
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(VendorDashboardControls);
