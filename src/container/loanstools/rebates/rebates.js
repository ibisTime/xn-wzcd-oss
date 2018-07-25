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
    showSucMsg,
    dateTimeFormat
} from 'common/js/util';
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
            field: 'carDealerName',
            search: true
        }, {
            title: '申请人',
            field: 'applyUserName'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'date',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            title: '返点金额',
            field: 'totalAmount',
            amount: true
        }, {
            title: '缘由',
            field: 'reason'
        }, {
            title: '结算方式',
            field: 'settleType',
            type: 'select',
            key: 'settle_way'
        }, {
            title: '办理状态',
            field: 'curNodeCode',
            type: 'select',
            key: 'repoint_status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632245,
            btnEvent: {
                bill: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/loanstools/rebates/bill`);
                },
                certain: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loanstools/rebates/certain?code=${selectedRowKeys[0]}`);
                    }
                },
                companyCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loanstools/rebates/companyCheck?code=${selectedRowKeys[0]}`);
                    }
                },
                finance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loanstools/rebates/finance?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default rebates;