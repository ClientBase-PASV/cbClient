import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

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

  const orderCount = get(props, 'Client.order', []).length;

  useEffect(() => {
    props.clientGetById(clientId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{createdAt}</div>
      <div>{notes}</div>
      <hr />
      <h3>Orders ({orderCount})</h3>
      ...loading
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Client: state.v2Client,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientGetById: (payload: string) => dispatch({ type: 'v2Client/getById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientView);
