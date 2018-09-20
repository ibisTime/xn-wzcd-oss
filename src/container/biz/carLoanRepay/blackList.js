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
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getRoleCode, moneyFormat } from 'common/js/util';

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
class BlackList extends React.Component {
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      render: (v, d) => {
          return d.budgetOrder.code;
      },
      search: true
  }, {
      title: '客户姓名',
      field: 'user',
      search: true,
      render: (v, d) => {
          return d.user.realName;
      }
  }, {
      title: '手机号',
      field: 'mobile',
      render: (v, d) => {
          return d.user.mobile;
      }
  }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true
  }, {
      title: '剩余欠款',
      field: 'restAmount',
      amount: true
  }, {
      title: '未还清收成本',
      field: 'restTotalCost',
      amount: true
  }, {
      title: '未还代偿金额',
      field: 'unRepayTotalAmount',
      render: (v) => {
        return v ? moneyFormat(v) : '0.00';
      }
  }];
    return this.props.buildList({
      fields,
      searchParams: {
        roleCode: getRoleCode(),
        curNodeCodeList: ['021_09', '021_10', '021_11', '021_12', '021_13', '021_14', '021_15', '021_16', '021_17', '021_18', '021_19', '021_20', '021_21', '021_22', '021_23', '021_24', '021_25', '021_27']
      },
      pageCode: 630520,
      btnEvent: {
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/biz/blackList/addedit?code=${selectedRows[0].budgetOrder.code}&afterCode=${selectedRowKeys[0]}&v=1`);
          }
        }
      }
    });
  }
}

export default BlackList;
