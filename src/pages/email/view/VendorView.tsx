import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

interface IProps {
  emailId: string;
  name: string;
  emailGetById: (id: string) => void;
}

const EmailView = (props: IProps) => {
  const emailId = get(props, 'match.params.emailId');
  const name = get(props, 'Email.name', '');

  useEffect(() => {
    props.emailGetById(emailId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Email: state.Email,
});

const mapDispatchToProps = (dispatch: any) => ({
  emailGetById: (payload: string) => dispatch({ type: 'Email/emailGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailView);
