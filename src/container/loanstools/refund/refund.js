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
} from '@redux/loanstools/refund';
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
    listWrapper
} from 'common/js/build-list';
import {
  lowerFrame,
  onShelf,
  sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanstoolsRefund,
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
class refund extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code'
        }, {
            title: '客户姓名',
            field: 'companyCode',
            search: true
        }, {
            title: '贷款银行',
            field: 'budgetAmount',
            search: true
        }, {
            title: '放款日期',
            field: 'useDatetime',
            type: 'date',
            search: true
        }, {
            title: '贷款金额',
            field: 'receiptAccount',
            amount: true
        }, {
            title: '应退按揭款',
            field: 'receiptAccount',
            amount: true
        }, {
            title: '办理状态',
            field: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                this.props.history.push(`/loanstools/refund/apply?code=${selectedRowKeys[0]}`);
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/refund/check?code=${selectedRowKeys[0]}`);
                }
              },
              certain: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/refund/certain?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default refund;