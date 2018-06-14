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
} from '@redux/postloantools/compensatory';
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
        ...state.postloantoolsCompensatory,
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
class compensatory extends React.Component {
    render() {
        const fields = [{
            title: '预算单号',
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
            title: '代偿性质',
            field: 'payDatetime',
            search: true
        }, {
            title: '预算金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '月还款额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '逾期金额',
            field: 'payDatetime',
            amount: true
        }, {
            title: '剩余垫资金额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '累计逾期次数',
            field: 'budgetAmount'
        }, {
            title: '实际预期次数',
            field: 'budgetAmount'
        }, {
            title: '累计代偿次数',
            field: 'budgetAmount'
        }, {
            title: '实际代偿次数',
            field: 'budgetAmount'
        }, {
            title: '状态',
            field: 'budgetAmount',
            search: true
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
                        this.props.history.push(`/postloantools/compensatory/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/compensatory/check?code=${selectedRowKeys[0]}`);
                    }
                },
                certain: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/compensatory/certain?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default compensatory;