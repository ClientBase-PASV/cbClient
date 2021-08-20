import React, { useEffect } from 'react';
import { Badge, Button, Col, Menu, Row, Affix } from 'antd';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { IClient } from '@/pages/v4/client/types';
import { Anchor } from 'antd';

interface IProps {
  children: any;
  clientGetInfoById: (id: string) => void;
  clientReset: () => void;
  open: (arg: ISidepanel) => void;
  callClient: (arg: ICallClient) => void;
  hangUpCall: () => void;
  ClientInfo: IClient;
}

interface ICallClient {
  phoneNumber: string;
  userId: string;
}

const ClientLayout = (props: IProps) => {
  const clientId = get(props, 'match.params.clientId');
  const tab = get(props, 'location.pathname', '').split('/').pop();
  const clientName = get(props, 'ClientInfo.name');
  const addressesCount = get(props, 'ClientInfo.addresses.length');
  const ordersCount = get(props, 'ClientInfo.orders.length');
  const invoicesCount = get(props, 'ClientInfo.invoices.length');
  const estimatesCount = get(props, 'ClientInfo.estimates.length');
  const paymentsCount = get(props, 'ClientInfo.payments.length');
  const messagesCount = get(props, 'ClientInfo.messages.length');

  //
  const callsCount = get(props, 'ClientInfo.calls.length', '');
  let clientPhone = get(props, 'ClientInfo.phoneNumber1', '');
  if (clientPhone) {
    clientPhone = `${clientPhone.code + clientPhone.number}`;
  }
  //

  useEffect(() => {
    props.clientGetInfoById(clientId);

    return () => {
      props.clientReset();
    };
  }, [clientId]);

  const addressCreate = () => {
    props.open({
      title: 'Create new Address',
      component: 'ClientAddressFormCreate',
      place: '',
      width: '95%',
      clientId,
    });
  };

  const orderCreate = () => {
    props.open({
      title: 'Create new Order',
      component: 'ClientOrderFormCreate',
      place: '',
      width: '95%',
      clientId,
    });
  };

  const estimateCreate = () => {
    props.open({
      title: 'Create new Estimate',
      component: 'ClientEstimateFormCreate',
      place: '',
      width: '95%',
      clientId,
    });
  };

  const invoiceCreate = () => {
    props.open({
      title: 'Create new Invoice',
      component: 'ClientInvoiceFormCreate',
      place: '',
      width: '95%',
      clientId,
    });
  };

  const clientEdit = () => {
    props.open({
      title: 'Edit Client Details',
      component: 'ClientInfoDetailsFormEdit',
      place: '',
      width: '95%',
      clientId,
    });
  };

  const callUser = () => {
    props.callClient({ phoneNumber: clientPhone, userId: clientId });
  };

  const hangUpCall = () => {
    props.hangUpCall();
  };

  if (!props.ClientInfo) return null;

  return (
    <>
      <div className="row">
        <div className="col-lg-2 col-md-2 col-2 mt-2 h4">
          <h5>
            <Link to={`/client`}>←</Link> {`${clientName}`}
          </h5>
        </div>
        <div className="col-lg-10 col-md-10 col-10">
          <Button className="mt-1 float-end" htmlType="submit" onClick={clientEdit}>
            Edit
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-2 col-2 border-end">
          <Affix offsetTop={70}>
            <Anchor affix={false}>
              <Menu selectedKeys={[tab]} mode="vertical" className="no-padding-tabs position-fixed ms-3 border-0">
                <div key="info">
                  <Anchor.Link href="#clientDetails" title="Client Details" />
                </div>

                <div key="addresses" className="d-flex align-items-center">
                  <Anchor.Link href="#addresses" title="Addresses" />
                  <Badge count={addressesCount} />
                </div>

                <div key="estimates" className="d-flex align-items-center">
                  <Anchor.Link href="#estimates" title="Estimates" />
                  <Badge count={estimatesCount} />
                </div>

                <div key="orders" className="d-flex align-items-center">
                  <Anchor.Link href="#orders" title="Orders" />
                  <Badge count={ordersCount} />
                </div>

                <div key="invoices" className="d-flex align-items-center">
                  <Anchor.Link href="#invoices" title="Invoices" />
                  <Badge count={invoicesCount} />
                </div>

                <div key="payments" className="d-flex align-items-center">
                  <Anchor.Link href="#payments" title="Payments" />
                  <Badge count={paymentsCount} />
                </div>

                <div key="messages" className="d-flex align-items-center">
                  <Anchor.Link href="#messages" title="Messages" />
                  <Badge count={messagesCount} />
                </div>

                <div key="calls" className="d-flex align-items-center">
                  <Anchor.Link href="#calls" title="Calls" />
                  <Badge count={callsCount} />
                </div>

                <div className="ml-auto">
                  {tab === 'addresses' && (
                    <Button type="primary" htmlType="submit" onClick={addressCreate}>
                      Create Address
                    </Button>
                  )}

                  {tab === 'estimates' && (
                    <Button type="primary" htmlType="submit" onClick={estimateCreate}>
                      Create Estimate
                    </Button>
                  )}

                  {tab === 'orders' && (
                    <Button type="primary" htmlType="submit" onClick={orderCreate}>
                      Create Order
                    </Button>
                  )}

                  {tab === 'invoices' && (
                    <Button type="primary" htmlType="submit" onClick={invoiceCreate}>
                      Create Invoice
                    </Button>
                  )}

                  {tab === 'calls' && (
                    <Button type="primary" htmlType="submit" onClick={callUser}>
                      Call
                    </Button>
                  )}

                  {tab === 'calls' && (
                    <Button type="primary" danger onClick={hangUpCall}>
                      Hang Up
                    </Button>
                  )}
                </div>
              </Menu>
            </Anchor>
          </Affix>
        </div>
        <div className="col-lg-10 col-md-10 col-2">
          <Row justify="center" className="mt-2">
            <Col span={24}>{props.children}</Col>
          </Row>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ClientInfo: state.ClientInfo,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientGetInfoById: (payload: string) => dispatch({ type: 'ClientInfo/getInfoById', payload }),
  clientReset: () => dispatch({ type: 'ClientInfo/reset' }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  callClient: (payload: ICallClient) => dispatch({ type: 'ClientCalls/callClient', payload }),
  hangUpCall: () => dispatch({ type: 'ClientCalls/hangUpCall' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientLayout);
