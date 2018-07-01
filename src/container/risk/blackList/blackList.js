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
} from '@redux/biz/blackList';
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg,
  getRoleCode
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';

@listWrapper(state => ({
  ...state.bizBlackList,
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
class blackList extends React.Component {
  render() {
    const fields = [
      {
        title: '客户姓名',
        field: 'realName',
        search: true,
        render: (v, d) => {
          return d.user.realName;
        }
      }, {
        title: '证件号',
        field: 'idNo',
        search: true,
        render: (v, d) => {
          return d.user.idNo;
        }
      }, {
        title: '手机号',
        field: 'mobile',
        search: true,
        render: (v, d) => {
          return d.user.mobile;
        }
      }, {
        title: '标记日期',
        field: 'repayDatetime',
        type: 'date'
      }, {
        title: '累计逾期期数(元)',
        field: 'totalOverdueCount',
        amount: true
      }
    ];
    return this.props.buildList({
      fields,
      searchParams: {
        roleCode: getRoleCode()
      },
      pageCode: 630520
    });
  }
}

export default blackList;
