import React, { useEffect } from 'react';
import { connect } from 'umi';
import '@/styles/styles.scss';
import '@/styles/nprogress.css';

interface IProps {
  children: any;
  auth: () => void;
}

const SecurityLayout = ({ children, auth }: IProps) => {
  useEffect(() => {
    auth();
  }, []);

  return children;
};

const mapDispatchToProps = (dispatch: any) => ({
  auth: () => dispatch({ type: 'v1User/auth' }),
});

export default connect(null, mapDispatchToProps)(SecurityLayout);
