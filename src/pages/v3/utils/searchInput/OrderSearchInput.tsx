import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { IOrder } from '@/pages/v3/order/types';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

interface IOrderSearch {
  clientId?: string;
  description?: string;
  order?: string;
}

interface IProps {
  search: (args: IOrderSearch) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (orderId: string) => void;
  value: { _id: string; description: string };
  clientId?: string;
  disabled?: boolean;
}

const OrderSearchInput = (props: IProps) => {
  const orderCode = get(props, 'value.code', '');
  const orderDescription = get(props, 'value.description', '');
  const clientId = get(props, 'clientId', '');
  const disabled = get(props, 'disabled', false);
  const value = orderDescription ? `${orderCode}: ${orderDescription}` : orderCode;

  const [selectedName, setSelectedName] = useState(value);

  //need this variable to see in useEffect if we selected other client and value for order need to be cleared
  const [lastClientId, setLastClientId] = useState('');

  const isLoading = get(props, 'loadingEffects.v3SearchInput/orderSearch', false);

  const list: IOrder[] = get(props, 'SearchInput.order', []);

  const onFocus = () => {
    props.search({ clientId });
  };

  const onSearch = debounce((description: string) => {
    if (description) props.search({ clientId, description });
  }, 500);

  const onSelect = (orderId = '') => {
    if (props.onChange) props.onChange(orderId);
  };

  const onChange = (v: string) => {
    setSelectedName(
      get(
        list.find((el) => el._id === v),
        'code',
        '',
      ),
    );
  };

  const options = list.map((el: IOrder) => (
    <Option key={el._id} value={el._id} className="font-weight-bold">
      {`${el.code}: ${el.description}`}
    </Option>
  ));

  useEffect(() => {
    if (lastClientId === clientId || !lastClientId) setSelectedName(value);
    else setSelectedName('');

    setLastClientId(clientId);
  }, [clientId]);

  return (
    <Select
      disabled={disabled}
      value={selectedName}
      showSearch
      defaultValue={value}
      placeholder="Select a order"
      optionFilterProp="children"
      onFocus={onFocus}
      onChange={onChange}
      onSearch={onSearch}
      onSelect={onSelect}
      loading={isLoading}
    >
      {options}
    </Select>
  );
};

const mapStateToProps = (state: any) => ({
  SearchInput: state.SearchInput,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  search: (payload: IOrderSearch) => dispatch({ type: 'SearchInput/orderSearch', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSearchInput);
