import { get } from 'lodash';

export function versionFromProps(props: object) {
  const path = get(props, 'location.pathname', '');
  const regexp = /\/v[0-9]/;
  return get(path.match(regexp), '[0]', '').replaceAll('/', '');
}
