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
} from '@redux/loanstools/estimate';
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
        ...state.securityEstimate,
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
class estimate extends React.Component {
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
            title: '预算金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '收款账号',
            field: 'receiptAccount'
        }, {
            title: '收款银行',
            field: 'receiptBank'
        }, {
            title: '用款日期',
            field: 'useDatetime',
            type: 'date'
        }, {
            title: '打款时间',
            field: 'name',
            search: true,
            type: 'date'
        }, {
            title: '打款金额',
            field: 'payDatetime',
            type: 'date'
        }, {
            title: '申请人',
            field: 'applyUser',
            search: true
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            search: true,
            type: 'date'
        }, {
            title: '办理状态',
            field: 'curNodeCode',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                this.props.history.push(`/loanstools/estimate/apply?code=${selectedRowKeys[0]}`);
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/estimate/check?code=${selectedRowKeys[0]}`);
                }
              },
              certain: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/estimate/certain?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default estimate;