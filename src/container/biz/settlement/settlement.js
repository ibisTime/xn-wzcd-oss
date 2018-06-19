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
    showSucMsg,
    dateTimeFormat,
    getRoleCode
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
            search: true
        }, {
            title: '银行',
            field: 'bankcardCode',
            type: 'select',
            listCode: 632037,
            keyName: 'bankCode',
            valueName: 'bankName',
            search: true
        }, {
            title: '客户姓名',
            field: 'realName',
            render: (v, d) => {
                return d.user.realName;
            },
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
            field: 'loanAmount'
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            amount: true
        }, {
            title: '逾期日期',
            field: 'repayDatetime',
            type: 'date'
        }, {
            title: '月还款额',
            field: 'monthAmount',
            amount: true
        }, {
            title: '逾期金额',
            field: 'overdueAmount',
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
            field: 'billDatetime',
            type: 'date'
        }, {
            title: '还款日',
            field: 'monthDatetime',
            type: 'date'
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
                roleCode: getRoleCode()
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/biz/settlement/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/biz/settlement/check?code=${selectedRowKeys[0]}`);
                    }
                },
                certain: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/biz/settlement/certain?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Settlement;
