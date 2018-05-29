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
} from '@redux/postloantools/import';
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
        ...state.postloantoolsImport,
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
class importCustomer extends React.Component {
    render() {
        const fields = [{
            title: '银行',
            field: 'code',
            search: true
        }, {
            title: '业务编号',
            field: 'companyCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'budgetAmount',
            search: true
        }, {
            title: '证件号',
            field: 'receiptAccount'
        }, {
            title: '放宽日期',
            field: 'payDatetime',
            type: 'date'
        }, {
            title: '贷款金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '剩余金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '逾期日期',
            field: 'payDatetime',
            type: 'date'
        }, {
            title: '月还款额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '逾期金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '剩余代偿金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '累计逾期次数',
            field: 'budgetAmount'
        }, {
            title: '实际逾期期数',
            field: 'budgetAmount'
        }, {
            title: '累计代偿次数',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '实际代偿次数',
            field: 'budgetAmount'
        }, {
            title: '账单日',
            field: 'budgetAmount'
        }, {
            title: '还款日',
            field: 'budgetAmount'
        }, {
            title: '总期数',
            field: 'budgetAmount'
        }, {
            title: '剩余期数',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632108,
            searchParams: {
                roleCode: getRoleCode()
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push('/postloantools/import/apply');
                    }
                },
                plan: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/import/plan?code=${selectedRowKeys[0]}`);
                    }
                },
                prepayment: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/import/prepayment?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default importCustomer;