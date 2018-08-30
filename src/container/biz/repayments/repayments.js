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
} from '@redux/biz/repayments/repayments';
import {
    listWrapper
} from 'common/js/build-list';
import {
    goOtherUrl
} from 'api/biz';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getUserId,
    moneyFormat,
    dateFormat,
    getQueryString
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.repayments,
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
class Repayments extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'refCode',
            search: true
        }, {
            title: '银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: 'fullName',
            search: true
        }, {
            title: '客户姓名',
            field: 'realName',
            search: true
        }, {
            title: '证件号',
            field: 'idNo',
            nowrap: true
        }, {
            title: '放款日期',
            field: 'bankFkDatetime',
            type: 'date'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            amount: true
        }, {
            title: '月还款额',
            field: 'monthAmount',
            amount: true
        }, {
            title: '逾期金额',
            field: 'restOverdueAmount',
            amount: true
        }, {
            title: '实际逾期期数',
            field: 'curOverdueCount'
        }, {
            title: '累计代偿次数',
            field: 'totalReplaceRepayCount'
        }, {
            title: '实际代偿次数',
            field: 'curReplaceRepayCount'
        }, {
            title: '账单日',
            field: 'billDatetime'
        }, {
            title: '还款日',
            field: 'monthDatetime'
        }, {
            title: '总期数',
            field: 'periods'
        }, {
            title: '剩余期数',
            field: 'restPeriods'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];

        return this.props.buildList({
            fields,
            pageCode: 630522,
            searchParams: {
                roleCode: getRoleCode()
            },
            btnEvent: {
                plan: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/biz/repayments/plan?code=${selectedRowKeys[0]}`);
                    }
                },
                pay: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        goOtherUrl(selectedRowKeys[0]).then(d => {
                            if (d) {
                                this.props.history.push(`/biz/mortgages/apply?code=${selectedRowKeys[0]}`);
                            } else {
                                this.props.history.push(`/biz/settlement/apply?code=${selectedRowKeys[0]}`);
                            }
                        });
                    }
                }
            }
        });
    }
}

export default Repayments;