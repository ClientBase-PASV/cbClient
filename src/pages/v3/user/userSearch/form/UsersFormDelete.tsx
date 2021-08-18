import React from 'react';
import { Button, Form, Row } from 'antd';

interface IProps {
  onFinish: (values: any) => void;
  onCancel: () => void;
  submitButtonText: string;
  userName: string;
}

const UsersFormDelete = (props: IProps) => {
  const { onFinish, onCancel, submitButtonText, userName } = props;

  // @ts-ignore
  return (
    <Form onFinish={onFinish}>
      <Form.Item>
        <p>
          Are you sure you want to delete <strong>{userName}</strong> user?
        </p>
      </Form.Item>

      <Row>
        <Form.Item>
          <Button danger htmlType="submit">
            {submitButtonText}
          </Button>
        </Form.Item>

        <Form.Item name="cancel">
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default UsersFormDelete;
