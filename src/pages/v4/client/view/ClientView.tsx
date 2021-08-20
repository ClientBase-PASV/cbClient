import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import OrderList from '@/pages/v4/client/view/OrderList';
import OrderCreate from '@/pages/v4/client/view/OrderCreate';

interface IProps {
  clientId: string;
  name: string;
  clientGetById: (id: string) => void;
}

const ClientView = (props: IProps) => {
  const clientId = get(props, 'match.params.clientId');
  const name = get(props, 'Client.name', '');
  const email = get(props, 'Client.email', '');
  const phone = get(props, 'Client.phone', '');
  const createdAt = get(props, 'Client.createdAt', '');
  const notes = get(props, 'Client.notes', '');
  const orders = get(props, 'Client.order', []);

  const orderCount = get(props, 'Client.order', []).length;

  useEffect(() => {
    props.clientGetById(clientId);
  }, []);

  // Bug
  let totalClientPaid = 0,
    totalProfitPotential = 0;
  for (let i = 0; i < orders.length - 1; i++) {
    totalClientPaid += orders[i].clientPaid;
    totalProfitPotential += orders[i].profitPotential || 0;
  }

  let totalClientDebt = 0,
    totalProfitActual = 0;
  for (let i = 0; i < orders.length; i++) {
    totalClientDebt += orders[i].clientDebt;
    totalProfitActual += orders[i].profitActual || 0;
  }

  return (
    <div>
      <h1>{name}</h1>

      <div>
        {new Date(createdAt).toLocaleDateString('en-gb', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </div>

      <div>{email}</div>
      <div>{phone}</div>
      <div>{notes}</div>

      <div>Total Client Paid: {totalClientPaid}</div>
      <div>Total Client Debt: {totalClientDebt}</div>
      <div>Total Profit Actual: {totalProfitActual}</div>
      <div>Total Profit Potencial: {totalProfitPotential}</div>

      <div className="flex justify-between mb-3 mt-10">
        <div> Orders ({orderCount}) </div>
        <OrderCreate />
      </div>

      <OrderList items={orders} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Client: state.v4Client,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientGetById: (payload: string) => dispatch({ type: 'v4Client/getById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientView);
