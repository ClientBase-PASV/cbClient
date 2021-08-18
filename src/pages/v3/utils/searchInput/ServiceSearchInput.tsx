import React, { useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { IService } from '@/pages/v3/service/types';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

interface IProps {
  search: (serviceName: string) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: IService) => void;
  name?: string;
  value?: {
    name: string;
  };
  disabled?: boolean;
}

const ServiceSearchInput = (props: IProps) => {
  const name = get(props, 'value.name', '');
  const disabled = get(props, 'disabled', false);
  const [selected, setSelected] = useState(name);

  const isLoading = get(props, 'loadingEffects.v3SearchInput/serviceSearch', false);

  const list: IService[] = get(props, 'SearchInput.service', []);

  const onFocus = () => {
    if (!list.length) props.search('');
  };

  const onSearch = debounce((value) => {
    if (value) props.search(value);
  }, 500);

  // const onSelect = (value = '') => {
  //   if (props.onChange) props.onChange(value);
  // };

  const onChange = (id: string) => {
    props.onChange(list.find((el) => el._id === id));
  };

  const options = list.map((el: IService) => (
    <Option key={el._id} value={el._id} label={`${el.vendor.name}`}>
      <div className="option">
        <div className="flex justify-between">
          <div className="font-semibold">{el.name}</div>
          <div>{el.vendor.name}</div>
          <div>
            {el.vendorPrice} / {el.clientPrice}
          </div>
        </div>
      </div>
    </Option>
  ));

  return (
    <Select
      disabled={disabled}
      // value={selectedName}
      showSearch
      defaultValue={name}
      placeholder="Select Service"
      optionFilterProp="children"
      onFocus={onFocus}
      onChange={onChange}
      onSearch={onSearch}
      // onSelect={onSelect}
      loading={isLoading}
    >
      {options}
    </Select>
  );
};

const mapStateToProps = (state: any) => ({
  SearchInput: state.v3SearchInput,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  search: (serviceName: string) => dispatch({ type: 'v3SearchInput/serviceSearch', payload: serviceName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSearchInput);
