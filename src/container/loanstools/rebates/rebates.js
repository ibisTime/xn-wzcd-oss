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
} from '@redux/loanstools/rebates';
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
        ...state.loanstoolsRebates,
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
class rebates extends React.Component {
    render() {
        const fields = [{
            title: '申请公司',
            field: 'code',
            search: true
        }, {
            title: '申请人',
            field: 'companyCode',
            search: true
        }, {
            title: '申请时间',
            field: 'companyCode',
            search: true,
            type: 'date'
        }, {
            title: '总金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '缘由',
            field: 'receiptAccount'
        }, {
            title: '办理状态',
            field: 'status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                this.props.history.push(`/loanstools/rebates/apply?code=${selectedRowKeys[0]}`);
              },
              bill: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/rebates/bill?code=${selectedRowKeys[0]}`);
                }
              },
              certain: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/rebates/certain?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default rebates;