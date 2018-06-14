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
} from '@redux/postloantools/budget';
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
        ...state.postloantoolsBudget,
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
class budget extends React.Component {
    render() {
        const fields = [{
            title: '预算单号',
            field: 'code',
            search: true
        }, {
            title: '业务编号',
            field: 'companyCode'
        }, {
            title: '预算金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '代偿类型',
            field: 'receiptAccount',
            search: true
        }, {
            title: '收款人名称',
            field: 'payDatetime'
        }, {
            title: '收款人开户行',
            field: 'budgetAmount'
        }, {
            title: '收款人账号',
            field: 'budgetAmount'
        }, {
            title: '申请人',
            field: 'payDatetime',
            search: true
        }, {
            title: '申请时间',
            field: 'budgetAmount',
            search: true
        }, {
            title: '状态',
            field: 'budgetAmount',
            search: true
        }, {
            title: '剩余代偿金额',
            field: 'budgetAmount',
            amount: true
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
                        this.props.history.push('/postloantools/budget/apply');
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/budget/check?code=${selectedRowKeys[0]}`);
                    }
                },
                prepayment: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/budget/prepayment?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default budget;