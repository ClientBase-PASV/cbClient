import React from 'react';
import { Pagination } from 'antd';
import { get } from 'lodash';
import { IPager } from './types';

interface IPagerComponent {
  onChange: (page: number) => void;
  pager: IPager;
}

const Pager = (props: IPagerComponent) => {
  const { onChange, pager } = props;
  const limit = get(pager, 'limit', 1);
  // const pageCount = get(pager, 'pageCount', 1);
  const pageCurrent = get(pager, 'pageCurrent', 1);
  const itemsCount = get(pager, 'itemsCount', 1);

  if (!itemsCount) return null;

  return (
    <div className="d-flex align-items-center mt-2">
      <Pagination
        total={itemsCount}
        pageSize={Number(limit)}
        current={pageCurrent}
        showSizeChanger={false}
        onChange={onChange}
        hideOnSinglePage={true}
        className="mr-3"
      />

      <div className="h-100 d-flex small">Items {itemsCount}</div>
    </div>
  );
};

export default Pager;
