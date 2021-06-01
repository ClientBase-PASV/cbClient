import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';

export interface IVerifyEmail {
  userId: string;
  hash: string;
}

interface IProps {
  userPasswordReset: (values: any) => void;
  emailVerify: (arg: IVerifyEmail) => void;
}

const UserEmailVerify = (props: IProps) => {
  const userId = get(props, 'match.params.userId');
  const hash = get(props, 'match.params.hash');

  useEffect(() => {
    props.emailVerify({ userId, hash });
  }, []);

  return (
    <div>
      Email Verified <a href="https://clientBase.us/wizard">Continue</a>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  emailVerify: (payload: IVerifyEmail) => dispatch({ type: 'Account/emailVerify', payload }),
});

export default connect(null, mapDispatchToProps)(UserEmailVerify);
