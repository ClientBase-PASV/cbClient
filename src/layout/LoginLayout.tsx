import React from 'react';
import { Col, Row } from 'antd';

interface IProps {
  children: any;
}

export default (props: IProps) => {
  return (
    <>
      <Row align="middle"></Row>

      <Row justify="center" className="mt-3rem ">
        <Col xs={20} sm={20} md={12} lg={8}>
          {props.children}
        </Col>
      </Row>
    </>
  );
};
