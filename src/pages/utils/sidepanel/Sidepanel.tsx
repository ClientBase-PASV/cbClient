import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Drawer } from 'antd';
import { ISidepanel } from './types';

import BaseFormCreateWrapper from '../../base/form/BaseFormCreateWrapper';
import BaseFormEditWrapper from '../../base/form/BaseFormEditWrapper';

import V1UsersFormDeleteWrapper from '../../v1/user/userSearch/form/UsersFormDeleteWrapper';
import V1UserFormSendMessageWrapper from '../../v1/user/userSearch/form/UserFormSendMessageWrapper';

import V1ClientFormCreateWrapper from '../../v1/client/form/ClientFormCreateWrapper';
import V1ClientFormEditWrapper from '../../v1/client/form/ClientFormEditWrapper';

import V1VendorFormCreateWrapper from '../../v1/vendor/form/VendorFormCreateWrapper';
import V1VendorFormEditWrapper from '../../v1/vendor/form/VendorFormEditWrapper';

import V1OrderFormCreateWrapper from '../../v1/order/form/OrderFormCreateWrapper';
import V1OrderFormEditWrapper from '../../v1/order/form/OrderFormEditWrapper';

import V1ServiceFormCreateWrapper from '../../v1/service/form/ServiceFormCreateWrapper';
import V1ServiceFormEditWrapper from '../../v1/service/form/ServiceFormEditWrapper';

// ---------------------------------------------------------------------------

import V2ClientFormCreateWrapper from '../../v2/client/form/ClientFormCreateWrapper';
import V2ClientFormEditWrapper from '../../v2/client/form/ClientFormEditWrapper';

import V2UsersFormDeleteWrapper from '../../v2/user/userSearch/form/UsersFormDeleteWrapper';
import V2UserFormSendMessageWrapper from '../../v2/user/userSearch/form/UserFormSendMessageWrapper';

import V2VendorFormCreateWrapper from '../../v2/vendor/form/VendorFormCreateWrapper';
import V2VendorFormEditWrapper from '../../v2/vendor/form/VendorFormEditWrapper';

import V2OrderFormCreateWrapper from '../../v2/order/form/OrderFormCreateWrapper';
import V2OrderFormEditWrapper from '../../v2/order/form/OrderFormEditWrapper';

import V2ServiceFormCreateWrapper from '../../v2/service/form/ServiceFormCreateWrapper';
import V2ServiceFormEditWrapper from '../../v2/service/form/ServiceFormEditWrapper';

// ---------------------------------------------------------------------------

import V3ClientFormCreateWrapper from '../../v3/client/form/ClientFormCreateWrapper';
import V3ClientFormEditWrapper from '../../v3/client/form/ClientFormEditWrapper';

import V3UsersFormDeleteWrapper from '../../v3/user/userSearch/form/UsersFormDeleteWrapper';
import V3UserFormSendMessageWrapper from '../../v3/user/userSearch/form/UserFormSendMessageWrapper';

import V3VendorFormCreateWrapper from '../../v3/vendor/form/VendorFormCreateWrapper';
import V3VendorFormEditWrapper from '../../v3/vendor/form/VendorFormEditWrapper';

import V3OrderFormCreateWrapper from '../../v3/order/form/OrderFormCreateWrapper';
import V3OrderFormEditWrapper from '../../v3/order/form/OrderFormEditWrapper';

import V3ServiceFormCreateWrapper from '../../v3/service/form/ServiceFormCreateWrapper';
import V3ServiceFormEditWrapper from '../../v3/service/form/ServiceFormEditWrapper';

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

    v1ClientFormCreate: <V1ClientFormCreateWrapper />,
    v1ClientFormEdit: <V1ClientFormEditWrapper />,

    v1VendorFormCreate: <V1VendorFormCreateWrapper />,
    v1VendorFormEdit: <V1VendorFormEditWrapper />,

    v1OrderFormCreate: <V1OrderFormCreateWrapper />,
    v1OrderFormEdit: <V1OrderFormEditWrapper />,

    v1ServiceFormCreate: <V1ServiceFormCreateWrapper />,
    v1ServiceFormEdit: <V1ServiceFormEditWrapper />,

    v1UsersFormDelete: <V1UsersFormDeleteWrapper />,
    v1UserFormSendMessage: <V1UserFormSendMessageWrapper />,

    // ---------------------------------------------------------------------------

    v2ClientFormCreate: <V2ClientFormCreateWrapper />,
    v2ClientFormEdit: <V2ClientFormEditWrapper />,

    v2VendorFormCreate: <V2VendorFormCreateWrapper />,
    v2VendorFormEdit: <V2VendorFormEditWrapper />,

    v2OrderFormCreate: <V2OrderFormCreateWrapper />,
    v2OrderFormEdit: <V2OrderFormEditWrapper />,

    v2ServiceFormCreate: <V2ServiceFormCreateWrapper />,
    v2ServiceFormEdit: <V2ServiceFormEditWrapper />,

    v2UsersFormDelete: <V2UsersFormDeleteWrapper />,
    v2UserFormSendMessage: <V2UserFormSendMessageWrapper />,

    // ---------------------------------------------------------------------------

    v3ClientFormCreate: <V3ClientFormCreateWrapper />,
    v3ClientFormEdit: <V3ClientFormEditWrapper />,

    v3VendorFormCreate: <V3VendorFormCreateWrapper />,
    v3VendorFormEdit: <V3VendorFormEditWrapper />,

    v3OrderFormCreate: <V3OrderFormCreateWrapper />,
    v3OrderFormEdit: <V3OrderFormEditWrapper />,

    v3ServiceFormCreate: <V3ServiceFormCreateWrapper />,
    v3ServiceFormEdit: <V3ServiceFormEditWrapper />,

    v3UsersFormDelete: <V3UsersFormDeleteWrapper />,
    v3UserFormSendMessage: <V3UserFormSendMessageWrapper />,
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
