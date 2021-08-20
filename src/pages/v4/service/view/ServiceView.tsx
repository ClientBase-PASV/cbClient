import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  serviceId: string;
  name: string;
  serviceGetById: (id: string) => void;
}

const ServiceView = (props: IProps) => {
  const serviceId = get(props, 'match.params.serviceId');
  const name = get(props, 'ServiceView.name', '');

  console.log(props);

  useEffect(() => {
    props.serviceGetById(serviceId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ServiceView: state.ServiceView,
});

const mapDispatchToProps = (dispatch: any) => ({
  serviceGetById: (payload: string) => dispatch({ type: 'ServiceView/serviceGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceView);
