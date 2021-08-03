import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';

import validator from '@/utils/validators';
import Check from '@/pages/utils/Check';
import { history } from '@@/core/history';

export interface ICompanyUser {
  companyName: string;
  phoneNumber1: string;
  email: string;
}

export interface IVerifyEmailArg {
  email: string;
  userId: string;
}

interface IProps {
  isLoading: boolean;
  submitButtonText: string;
  goToUserProfile: (userId: string) => void;
  companyUserCreate: (values: ICompanyUser) => void;
  userVerifyEmailSend: (arg: IVerifyEmailArg) => void;
}

const Onboarding = (props: IProps) => {
  const [disableSubmit, setDisableSubmit] = useState(true);

  const isLoadingAuth = get(props, 'loadingEffects.v1User/auth', true);

  const email = get(props, 'User.email', '');
  const emailConfirmed = get(props, 'User.emailConfirmation.confirmed', false);
  const userId = get(props, 'User._id', '');

  const [openResend, setOpenResend] = useState(false);

  const onFinish = () => {
    history.push(`/v1/`);
  };

  const resetHandler = () => {
    setOpenResend(true);
  };

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    setDisableSubmit(hasErrors);
  };

  const steps = ['Email confirmation', 'Finish'];

  const [newEmail, setNewEmail] = useState('');

  const onChangeEmail = (e: any) => {
    setNewEmail(e.target.value);
  };

  const currentStep = () => {
    let step = steps[0];
    if (emailConfirmed) step = steps[1];
    return step;
  };

  if (isLoadingAuth || !userId) return null;

  return (
    <div className="container mt-6rem">
      <div className="row">
        <div className="col-md-4">
          <div className="mb-4">
            <span className="mr-1">
              <Check checked={emailConfirmed} />
            </span>
            <span className={classNames('ms-2', currentStep() === steps[0] && 'fw-bold')}>Confirm Email</span>
          </div>
        </div>

        <div className="col-md-8">
          {currentStep() === steps[0] && (
            <Form name="confirm_email" onFieldsChange={onFieldsChange}>
              {!openResend ? (
                <>
                  <h5>We sent you confirmation email to {email}.</h5>
                  <p>Please check your inbox (and spam folder) and verify.</p>
                  <p>
                    Have not received email?
                    <Button type="link" onClick={resetHandler}>
                      Resend confirmation email
                    </Button>
                  </p>
                </>
              ) : (
                <Form name="email">
                  <p>Resend confirmation email {newEmail} </p>

                  <Form.Item name="email" rules={[{ type: 'email' }, validator.require]}>
                    <Input placeholder="Email" defaultValue={email} onChange={onChangeEmail} value={newEmail} />
                  </Form.Item>

                  <Button type="primary" onClick={() => props.userVerifyEmailSend({ userId: userId, email: newEmail })}>
                    Resend
                  </Button>
                </Form>
              )}
            </Form>
          )}

          {currentStep() === steps[1] && (
            <>
              <h6>Welcome to ClientBase!</h6>

              <Button type="primary" htmlType="submit" onClick={onFinish}>
                Let's get started
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  User: state.v1User,
});

const mapDispatchToProps = (dispatch: any) => ({
  userVerifyEmailSend: (payload: IVerifyEmailArg) => dispatch({ type: 'v1User/userVerifyEmailSend', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
