import React from 'react';
import { get } from 'lodash';
import { Col, Row, Statistic } from 'antd';
import { IOrderStats } from '@/pages/v1/order/types';

interface IProps {
  stats: IOrderStats;
}

const OrderStats = (props: IProps) => {
  const orderStats = get(props, 'stats', '');

  // if (isEmpty(orderStats)) return null;

  const totalCount = get(orderStats, 'totalCount', '...');
  const totalCountDouble = get(orderStats, 'totalCountDouble', '...');
  const totalCountTriple = get(orderStats, 'totalCountTriple', '...');
  const totalCountTen = get(orderStats, 'totalCountTen', '...');

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total" value={totalCount} />
      </Col>

      <Col span={6}>
        <Statistic title="Trend" value={totalCountDouble} />
      </Col>

      <Col span={6}>
        <Statistic title="Users" value={totalCountTriple} />
      </Col>

      <Col span={6}>
        <Statistic title="Hits" value={totalCountTen} />
      </Col>
    </Row>
  );
};

export default OrderStats;
