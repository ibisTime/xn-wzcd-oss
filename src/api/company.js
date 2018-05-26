import fetch from 'common/js/fetch';

export function getCompList(parentCode) {
  return fetch(630106, { parentCode });
}
