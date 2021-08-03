import React, { useState } from 'react';
import { Select } from 'antd';
import { connect } from 'umi';
import { debounce, get } from 'lodash';
import { IVendor } from '@/pages/vendor/types';
import { ILoadingEffects } from '@/types';

const { Option } = Select;

interface IProps {
  search: (vendorName: string) => void;
  loadingEffects: ILoadingEffects;
  SearchInput: any;
  onChange?: (value: string) => void;
  name?: string;
  value?: {
    name: string;
  };
  disabled?: boolean;
}

const VendorSearchInput = (props: IProps) => {
  const name = get(props, 'value.name', '');
  const disabled = get(props, 'disabled', false);
  const [selectedName, setSelectedName] = useState(name);

  const isLoading = get(props, 'loadingEffects.SearchInput/vendorSearch', false);

  const list: IVendor[] = get(props, 'SearchInput.vendor.list', []);

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

  const options = list.map((el: IVendor) => (
    <Option key={el._id} value={el._id} className="font-weight-bold">
      {el.name}
      <div className="option">
        <div className="small d-flex justify-content-between text-muted">
          <div>{el.email}</div>
          <div>{el.phoneNumber}</div>
        </div>
      </div>
    </Option>
  ));

  return (
    <Select
      disabled={disabled}
      value={selectedName}
      showSearch
      defaultValue={name}
      placeholder="Select Vendor"
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
  search: (vendorName: string) => dispatch({ type: 'SearchInput/vendorSearch', payload: vendorName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorSearchInput);
