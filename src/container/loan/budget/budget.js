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
} from '@redux/loan/budget';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getRoleCode} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.loanBudget,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Budget extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '业务编号',
            search: true
        }, {
            field: 'companyName',
            title: '业务公司',
            search: true
        }, {
            field: 'customerName',
            title: '客户姓名',
            search: true
        }, {
            field: 'carDealerName',
            title: '汽车经销商',
            search: true
        }, {
            field: 'carModel',
            title: '车辆型号'
        }, {
            field: 'invoicePrice',
            title: '车辆价格',
            amount: true
        }, {
            field: 'loanAmount',
            title: '贷款金额',
            amount: true
        }, {
            field: 'loanPeriods',
            title: '贷款周期',
            render: (v) => {
              return v ? v + '期' : '-';
            }
        }, {
            field: 'loanBankName',
            title: '贷款银行',
            search: true
        }, {
            field: 'bankRate',
            title: '银行利率',
            return: (v, d) => {
              return (d.bankRate * 100).toFixed(4) + '%';
            }
        }, {
            field: 'isAdvanceFund',
            title: '是否垫资',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'saleUserName',
            title: '业务员'
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'date',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
                roleCode: getRoleCode()
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_01' && selectedRows[0].curNodeCode !== '002_05') {
                        showWarnMsg('当前不是填写预算单或重新填写预算单的节点');
                    } else {
                        this.props.history.push(`/loan/budget/addedit?isApply=1&code=${selectedRowKeys[0]}&saleUserId=${selectedRows[0].saleUserId}&carDealerCode=${selectedRows[0].carDealerCode}`);
                    }
                },
                applyExternal: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '002_01' && selectedRows[0].curNodeCode !== '002_05') {
                        showWarnMsg('当前不是填写预算单或重新填写预算单的节点');
                    } else {
                        this.props.history.push(`/loan/budget/applyExternal?isApply=1&code=${selectedRowKeys[0]}&saleUserId=${selectedRows[0].saleUserId}`);
                    }
                },
                revoke: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/budget/detail?isRevoke=1&v=1&code=${selectedRowKeys[0]}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/budget/detail?v=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Budget;
