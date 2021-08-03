import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const ServiceDashboardControls = (props: IProps) => {
  const serviceCreate = () => {
    props.open({
      title: 'Create new Service',
      component: 'ServiceFormCreate',
      place: 'ServiceDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={serviceCreate}>
      Create Service
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(ServiceDashboardControls);
