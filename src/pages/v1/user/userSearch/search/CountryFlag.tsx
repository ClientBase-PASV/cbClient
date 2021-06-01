import React from 'react';
import { get } from 'lodash';
import { countryListWithIsoCode } from '@/pages/user/constants';

interface IProps {
  countryName: string;
}

function CountryFlag(props: IProps) {
  const { countryName } = props;
  const isoCountryCode = get(countryListWithIsoCode, countryName);

  return countryName ? (
    <img alt="countryName" src={`https://www.countryflags.io/${isoCountryCode}/flat/32.png`} />
  ) : null;
}

export default CountryFlag;
