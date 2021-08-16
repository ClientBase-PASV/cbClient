import React, { useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { IService } from '@/pages/v2/service/types';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

interface IProps {
  search: (serviceName: string) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: string) => void;
  name?: string;
  value?: {
    name: string;
  };
  disabled?: boolean;
}

const ServiceSearchInput = (props: IProps) => {
  const name = get(props, 'value.name', '');
  const disabled = get(props, 'disabled', false);
  const [selectedName, setSelectedName] = useState(name);

  const isLoading = get(props, 'loadingEffects.SearchInput/serviceSearch', false);

  const list: IService[] = get(props, 'SearchInput.service', []);

  const onFocus = () => {
    if (!list.length) props.search('');
  };

  const onSearch = debounce((value) => {
    if (value) props.search(value);
  }, 500);

  const onSelect = (value = '') => {
    if (props.onChange) props.onChange(value);
  };

  const onChange = (v: string) => {
    setSelectedName(
      get(
        list.find((el) => el._id === v),
        'name',
        '',
      ),
    );
  };

  const options = list.map((el: IService) => (
    <Option key={el._id} value={el._id} className="font-weight-bold">
      {el.name}
      {/*<div className="option">*/}
      {/*  <div className="small d-flex justify-content-between text-muted">*/}
      {/*    <div>{el.email}</div>*/}
      {/*    <div>{el.phoneNumber}</div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </Option>
  ));

  return (
    <Select
      disabled={disabled}
      value={selectedName}
      showSearch
      defaultValue={name}
      placeholder="Select Service"
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
  SearchInput: state.v2SearchInput,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  search: (serviceName: string) => dispatch({ type: 'v2SearchInput/serviceSearch', payload: serviceName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSearchInput);
