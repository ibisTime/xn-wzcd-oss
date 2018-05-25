import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/node';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.securityNode,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class node extends React.Component {
  render() {
    const fields = [{
      title: '节点名称',
      field: 'name',
      search: true
    }];
    return this.props.buildList({ fields, pageCode: 630155 });
  }
}

export default node;
