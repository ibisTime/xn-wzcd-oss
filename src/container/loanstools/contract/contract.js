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
} from '@redux/loanstools/contract';
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
        ...state.loanstoolsContract,
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
class contract extends React.Component {
    render() {
        const fields = [{
            title: '合同号',
            field: 'code',
            search: true
        }, {
            title: '客户姓名',
            field: 'companyCode',
            search: true
        }, {
            title: '身份证号',
            field: 'companyCode'
        }, {
            title: '贷款金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '银行',
            field: 'receiptAccount',
            search: true
        }, {
            title: '账单日',
            field: 'status',
            type: 'date'
        }, {
            title: '还款日',
            field: 'status',
            type: 'date'
        }, {
            title: '信用卡号',
            field: 'status'
        }, {
            title: '合同签订日',
            field: 'status',
            type: 'date'
        }, {
            title: '导入日期',
            field: 'status',
            search: true,
            type: 'date'
        }, {
            title: '状态',
            field: 'status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
            btnEvent: {
              import: (selectedRowKeys, selectedRows) => {
                this.props.history.push(`/loanstools/contract/import?code=${selectedRowKeys[0]}`);
              }
            }
        });
    }
}

export default contract;