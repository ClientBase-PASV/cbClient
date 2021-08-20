import React from 'react';
import { Button, Form, Row, Input } from 'antd';

const { TextArea } = Input;

interface IProps {
  onFinish: (values: any) => void;
  onCancel: () => void;
  submitButtonText: string;
  userName: string;
  userId: string;
}

const UserFormSendMessage = (props: IProps) => {
  const { onFinish, onCancel, submitButtonText, userName } = props;

  return (
    <Form onFinish={(values) => onFinish(values)} initialValues={{ 'sms text': '...' }}>
      <Form.Item>
        Type message for <strong>{userName}</strong>.
      </Form.Item>

      <Form.Item name="sms text">
        <TextArea />
      </Form.Item>

      <Row>
        <Form.Item>
          <Button type={'primary'} htmlType="submit">
            {submitButtonText}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default UserFormSendMessage;
