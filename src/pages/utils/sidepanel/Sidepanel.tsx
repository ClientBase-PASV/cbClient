import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Drawer } from 'antd';
import UsersFormDeleteWrapper from '../../v1/user/userSearch/form/UsersFormDeleteWrapper';
import { ISidepanel } from './types';
import UserFormSendMessageWrapper from '../../v1/user/userSearch/form/UserFormSendMessageWrapper';

import BaseFormCreateWrapper from '../../base/form/BaseFormCreateWrapper';
import BaseFormEditWrapper from '../../base/form/BaseFormEditWrapper';

import ClientFormCreateWrapper from '../../v1/client/form/ClientFormCreateWrapper';
import ClientFormEditWrapper from '../../v1/client/form/ClientFormEditWrapper';

import VendorFormCreateWrapper from '../../v1/vendor/form/VendorFormCreateWrapper';
import VendorFormEditWrapper from '../../v1/vendor/form/VendorFormEditWrapper';

import OrderFormCreateWrapper from '../../v1/order/form/OrderFormCreateWrapper';
import OrderFormEditWrapper from '../../v1/order/form/OrderFormEditWrapper';

import ServiceFormCreateWrapper from '../../v1/service/form/ServiceFormCreateWrapper';
import ServiceFormEditWrapper from '../../v1/service/form/ServiceFormEditWrapper';

interface IProps extends ISidepanel {
  Sidepanel: ISidepanel;
  close: () => void;
}

const Sidepanel = (props: IProps) => {
  const open = get(props, 'Sidepanel.open', false);
  const component = get(props, 'Sidepanel.component', '');
  const title = get(props, 'Sidepanel.title', '');
  const width = get(props, 'Sidepanel.width', 750);

  const components: any = {
    BaseFormCreate: <BaseFormCreateWrapper />,
    BaseFormEdit: <BaseFormEditWrapper />,

    ClientFormCreate: <ClientFormCreateWrapper />,
    ClientFormEdit: <ClientFormEditWrapper />,

    VendorFormCreate: <VendorFormCreateWrapper />,
    VendorFormEdit: <VendorFormEditWrapper />,

    OrderFormCreate: <OrderFormCreateWrapper />,
    OrderFormEdit: <OrderFormEditWrapper />,

    ServiceFormCreate: <ServiceFormCreateWrapper />,
    ServiceFormEdit: <ServiceFormEditWrapper />,

    UsersFormDelete: <UsersFormDeleteWrapper />,
    UserFormSendMessage: <UserFormSendMessageWrapper />,
  };

  const mapping = (c: string): any => {
    return components[c] || null;
  };

  const onCloseDrawer = () => {
    props.close();
  };

  return (
    <Drawer title={title} width={width} onClose={onCloseDrawer} visible={open}>
      {mapping(component)}
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  Sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  close: () => dispatch({ type: 'Sidepanel/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
