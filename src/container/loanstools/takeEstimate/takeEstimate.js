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
} from '@redux/loanstools/take';
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
import { listWrapper } from 'common/js/build-list';
import {
  lowerFrame,
  onShelf,
  sendMsg
} from 'api/biz';

@listWrapper(
  state => ({
    ...state.loanstoolsTakeEstimate,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class take extends React.Component {
  render() {
    const fields = [{
      title: '预算单号',
      field: 'code',
      search: true
    }, {
      title: '业务公司',
      field: 'companyCode',
      search: true
    }, {
      title: '打款金额',
      field: 'budgetAmount',
      amount: true
    }, {
      title: '垫资总额',
      field: 'receiptAccount',
      amount: true
    }, {
      title: '垫资日期',
      field: 'useDatetime',
      search: true,
      type: 'date'
    }, {
      title: '应收金额',
      field: 'receiptAccount',
      amount: true
    }, {
      title: '实收金额',
      field: 'receiptAccount',
      amount: true
    }, {
      title: '收款时间',
      field: 'useDatetime',
      type: 'date'
    }, {
      title: '办理状态',
      field: 'curNodeCode',
      type: 'select',
      listCode: 630147,
      params: {
        type: '005'
      },
      keyName: 'code',
      valueName: 'name'
    }];
    return this.props.buildList({
      fields,
      pageCode: 632108,
      searchParams: {
        roleCode: getRoleCode()
      },
      btnEvent: {
        entering: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/loanstools/take/enter?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default take;
