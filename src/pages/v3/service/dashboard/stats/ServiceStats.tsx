import React from 'react';
import { get } from 'lodash';
import { Col, Row, Statistic } from 'antd';
import { IServiceStats } from '@/pages/v3/service/types';

interface IProps {
  stats: IServiceStats;
}

const ServiceStats = (props: IProps) => {
  const serviceStats = get(props, 'stats', '');

  // if (isEmpty(serviceStats)) return null;

  const totalCount = get(serviceStats, 'totalCount', '...');
  const totalCountDouble = get(serviceStats, 'totalCountDouble', '...');
  const totalCountTriple = get(serviceStats, 'totalCountTriple', '...');
  const totalCountTen = get(serviceStats, 'totalCountTen', '...');

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

export default ServiceStats;
