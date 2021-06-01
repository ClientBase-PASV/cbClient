import React, { useState } from 'react';
import { connect, Link } from 'umi';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import validator from '@/utils/validators';
import { get } from 'lodash';
import { versionFromProps } from '@/utils/heplers';

interface ILoginForm {
  email: string;
  password: string;
}

interface IProps {
  userLogin: (arg: ILoginForm) => void;
  loadingEffects: { [key: string]: boolean };
}

const UserLogin = (props: IProps) => {
  const isLoading = get(props, 'loadingEffects.v1Account/login', false);

  const version = versionFromProps(props);

  const [disableSubmit, setDisableSubmit] = useState(true);

  const onFinish = (formValues: any) => {
    props.userLogin(formValues);
  };

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    const hasEmptyFields = allFields.some((el: any) => !el.value);
    setDisableSubmit(hasErrors || hasEmptyFields);
  };

  return (
    <Form size="large" name="normal_login" className="login-form" onFieldsChange={onFieldsChange} onFinish={onFinish}>
      <Link to={`/${version}`} className="text-8xl font-semibold">
        ClientBase {version}
      </Link>

      <h1>Welcome back!</h1>

      <Form.Item name="email" rules={[{ type: 'email' }, validator.require]}>
        <Input addonBefore={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={[validator.require]}>
        <Input addonBefore={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          disabled={disableSubmit}
          loading={isLoading}
        >
          Log in
        </Button>
      </Form.Item>

      <Form.Item>
        <p>
          Don’t have an account? <Link to={`/${version}/user/register`}>Create one</Link>.
        </p>

        <p>
          Forgot your password? <Link to={`/${version}/user/password/reset/request`}>Reset it</Link>.
        </p>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  userLogin: (payload: ILoginForm) => dispatch({ type: 'v1Account/login', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
