import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const ClientDashboardControls = (props: IProps) => {
  const clientCreate = () => {
    props.open({
      title: 'Create Client',
      component: 'ClientFormCreate',
      place: 'ClientDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={clientCreate}>
      Create Client
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(ClientDashboardControls);
