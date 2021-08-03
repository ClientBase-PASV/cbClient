import React from 'react';
import { Col, Row } from 'antd';

interface IProps {
  children: any;
}

export default ({ children }: IProps) => {
  return (
    <>
      <Row justify="center">
        <Col xs={20} sm={20} md={12} lg={8}>
          {children}
        </Col>
      </Row>
    </>
  );
};
