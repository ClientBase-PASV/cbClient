import React from 'react';
import { Pagination, Row } from 'antd';

const UsersPagination = (props: any) => {
  const { onChange, pagination } = props;

  const { pageCurrent, itemsCount, limit } = pagination;

  return (
    <Row justify="center" className="mb-3rem">
      <Pagination
        total={itemsCount}
        current={pageCurrent}
        pageSize={limit}
        showSizeChanger={false}
        showLessItems
        showQuickJumper
        onChange={onChange}
      />
    </Row>
  );
};

export default UsersPagination;
