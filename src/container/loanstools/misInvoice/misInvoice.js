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
} from '@redux/loanstools/misInvoice';
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
        ...state.loanstoolsMisInvoice,
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
class misInvoice extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'companyCode',
            search: true
        }, {
            title: '汽车经销商',
            field: 'budgetAmount',
            search: true
        }, {
            title: '车辆型号',
            field: 'receiptAccount'
        }, {
            title: '车辆价格',
            field: 'receiptBank',
            amount: true
        }, {
            title: '贷款金额',
            field: 'receiptBank',
            amount: true
        }, {
            title: '期数',
            field: 'receiptBank'
        }, {
            title: '贷款银行',
            field: 'receiptBank',
            search: true
        }, {
            title: '银行利率',
            field: 'receiptBank'
        }, {
            title: '是否垫资',
            field: 'receiptBank',
            type: 'select',
            search: true
        }, {
            title: '业务员',
            field: 'receiptBank'
        }, {
            title: '银行经办支行',
            field: 'receiptBank'
        }, {
            title: '购车途径',
            field: 'receiptBank'
        }, {
            title: '申请时间',
            field: 'receiptBank'
        }, {
            title: '办理状态',
            field: 'receiptBank',
            type: 'select',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                this.props.history.push(`/loanstools/misInvoice/apply?code=${selectedRowKeys[0]}`);
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/misInvoice/check?code=${selectedRowKeys[0]}`);
                }
              },
              certain: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/misInvoice/certain?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default misInvoice;