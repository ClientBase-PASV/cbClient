import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { connect, Link } from 'umi';
import validator from '@/utils/validators';
import { get } from 'lodash';
import { IValidResetPasswordLink, IResetPasswordArg } from '@/pages/user/types';

interface IProps {
  userPasswordResetNew: (arg: IResetPasswordArg) => void;
  isValidResetPasswordLink: (arg: IValidResetPasswordLink) => void;
}

const UserPasswordResetNew = (props: IProps) => {
  const { userId, hash } = get(props, 'match.params', '');
  const isValidResetLink = get(props, 'isValidResetLink', false);
  const isLoadingValidationOfLink = get(props, 'loadingEffects.Account/isValidResetPasswordLink', true);

  const [disableSubmit, setDisableSubmit] = useState(true);

  const [form] = Form.useForm();
  const validatePasswordMatch = (rule: object, value: string) => {
    if (!value || form.getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject('The two passwords that you entered do not match!');
  };

  useEffect(() => {
    props.isValidResetPasswordLink({ userId, hash });
  }, []);

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    const hasEmptyFields = allFields.some((el: any) => !el.value);
    setDisableSubmit(hasErrors || hasEmptyFields);
  };

  const onFinish = ({ password }: IResetPasswordArg) => {
    props.userPasswordResetNew({ password, userId, hash });
  };

  const invalidLinkMessage = () => (
    <div>
      <h2>Invalid reset password link</h2>
      <p>
        The link may have expired. <Link to="/user/password/reset/request">Try again</Link>
      </p>
    </div>
  );

  if (isLoadingValidationOfLink) return null;
  if (!isValidResetLink) return invalidLinkMessage();

  return (
    <div className="row">
      <div className="col-24">
        <Form form={form} size="large" name="user_password_reset" onFinish={onFinish} onFieldsChange={onFieldsChange}>
          <h1>Enter your new password</h1>

          <Form.Item name="password" rules={[validator.require]}>
            <Input.Password addonBefore={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="password2"
            dependencies={['password']}
            rules={[validator.require, { validator: validatePasswordMatch }]}
          >
            <Input.Password
              addonBefore={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" disabled={disableSubmit}>
              Save new password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  isValidResetLink: state.Account.isValidResetLink,
});

const mapDispatchToProps = (dispatch: any) => ({
  userPasswordResetNew: (payload: IResetPasswordArg) => dispatch({ type: 'Account/passwordResetNew', payload }),
  isValidResetPasswordLink: (payload: IValidResetPasswordLink) =>
    dispatch({ type: 'Account/isValidResetPasswordLink', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPasswordResetNew);
