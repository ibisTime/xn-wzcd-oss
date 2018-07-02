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
} from '@redux/risk/redList';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {Button, Upload, Modal} from 'antd';
import {lowerFrame, onShelf} from 'api/biz';

@listWrapper(state => ({
  ...state.riskredList,
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
class redList extends React.Component {
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
          sign: '3'
        }
      });
  }
}

export default redList;
