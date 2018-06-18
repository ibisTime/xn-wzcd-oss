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
} from '@redux/biz/overdueList';
import {
  listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
  sendMsg
} from 'api/biz';

@listWrapper(state => ({
  ...state.bizOverdueList,
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
class overdueList extends React.Component {
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      key: 'code'
    }, {
      title: '贷款人',
      field: 'realName',
      search: true,
      render: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '期数',
      field: 'periods'
    }, {
      title: '逾期期数',
      field: 'curPeriods'
    }, {
      title: '逾期金额',
      field: 'overdueAmount',
      amount: true
    }, {
      title: '逾期日期',
      field: 'repayDatetime',
      type: 'date'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630540,
      searchParams: {
        curNodeCode: '004_03',
        refType: '0'
      },
      btnEvent: {
        overdue: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/overdueList/dispose?staffCode=${selectedRowKeys[0]}`);
          }
        },
        apply: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/overdueList/apply?staffCode=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default overdueList;
