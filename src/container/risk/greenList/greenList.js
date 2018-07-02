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
} from '@redux/risk/greenList';
import {listWrapper} from 'common/js/build-list';

@listWrapper(state => ({
  ...state.riskGreenList,
  parentCode: state.menu.subMenuCode
}), {
  setTableData,
  clearSearchParam,
  doFetching,
  setBtnList,
  cancelFetching,
  setPagination,
  setSearchParam,
  setSearchData
})
class GreenList extends React.Component {
  render() {
    const fields = [
      {
        title: '客户姓名',
        field: 'realName',
        search: true
      }, {
        title: '证件号',
        field: 'idNo'
      }, {
        title: '手机号',
        field: 'mobile'
      }, {
        title: '标记日期',
        field: 'signDatetime',
        type: 'date'
      }, {
        title: '累计逾期次数',
        field: 'totalGreenCount'
      }
    ];
    return this.props.buildList({
        fields,
        rowKey: 'userId',
        pageCode: 805120,
        searchParams: {
          sign: '1'
        }
      });
  }
}

export default GreenList;
