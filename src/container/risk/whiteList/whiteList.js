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
} from '@redux/biz/whiteList/whiteList';
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg,
  getRoleCode,
  dateTimeFormat,
  getUserId,
  moneyFormat,
  dateFormat
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  lowerFrame,
  onShelf
} from 'api/biz';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.bizWhiteList,
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
  }
)
class WhiteList extends React.Component {
  render() {
    const fields = [{
      title: '客户姓名',
      field: 'realName',
      search: true
    }, {
      title: '证件号',
      field: 'idNo'
    }, {
      title: '手机号',
      field: 'mobile'
    }];
    return this.props.buildList({
      fields,
      pageCode: 805120,
      searchParams: {
        sign: 'WHITE'
      }
    });
  }
}

export default WhiteList;