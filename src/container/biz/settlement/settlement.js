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
} from '@redux/biz/settlement';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    formatDate,
    getRoleCode,
    moneyFormat
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    lowerFrame,
    onShelf
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.bizSettlement,
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
class Settlement extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            render: (v, d) => {
                return d.budgetOrder.code;
            },
            search: true
        }, {
            title: '银行',
            field: 'loanBankName'
        }, {
            title: '客户姓名',
            field: 'realName',
            search: true
        }, {
            title: '证件号',
            field: 'idNo',
            render: (v, d) => {
                return d.user.idNo;
            }
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
            title: '逾期日期',
            field: 'repayDatetime',
            render: (v, d) => {
                return formatDate(d.curMonthRepayPlan.repayDatetime);
            }
        }, {
            title: '月还款额',
            field: 'monthAmount',
            amount: true
        }, {
            title: '逾期金额',
            field: 'overdueAmount',
            render: (v, d) => {
                return moneyFormat(d.curMonthRepayPlan.overdueAmount);
            }
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
            pageCode: 630520,
            searchParams: {
                roleCode: getRoleCode(),
                curNodeCodeList: ['020_02', '020_03', '020_03', '020_04', '020_05']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_02') {
                        showWarnMsg('当前节点不是提交结算单');
                    } else {
                        this.props.history.push(`/biz/settlement/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_04') {
                        showWarnMsg('当前节点不是财务审核');
                    } else {
                        this.props.history.push(`/biz/settlement/check?code=${selectedRowKeys[0]}`);
                    }
                },
                certain: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_05') {
                        showWarnMsg('当前节点不是确认付款');
                    } else {
                        this.props.history.push(`/biz/settlement/certain?code=${selectedRowKeys[0]}`);
                    }
                },
                totalCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '020_03') {
                        showWarnMsg('当前节点不是风控总监理审核');
                    } else {
                        this.props.history.push(`/biz/settlement/totalCheck?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Settlement;
