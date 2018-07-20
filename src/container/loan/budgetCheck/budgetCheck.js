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
} from '@redux/loan/budgetCheck';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getRoleCode} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.loanBudgetCheck,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class BudgetCheck extends React.Component {
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
            title: '期数'
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
                dkey: '0',
                dvalue: '否'
            }, {
                dkey: '1',
                dvalue: '是'
            }],
            keyName: 'dkey',
            valueName: 'dvalue',
            search: true
        }, {
            field: 'saleUserName',
            title: '业务员'
        }, {
            field: 'loanBankSubbranch',
            title: '银行经办支行',
            render: (v, data) => {
                return data.bankSubbranch.abbrName;
            }
        }, {
            field: 'shopWay',
            title: '购车途径',
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
                roleCode: getRoleCode(),
                curNodeCodeList: ['002_02', '002_03', '002_04']
            },
            btnEvent: {
                areaCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    // } else if (selectedRows[0].curNodeCode !== '002_02') {
                    //     showWarnMsg('当前不是区域总经理准入审核的节点');
                    } else {
                        this.props.history.push(`/loan/budget/detail?isAreaCheck=1&v=1&code=${selectedRowKeys[0]}`);
                    }
                },
                compCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    // } else if (selectedRows[0].curNodeCode !== '002_03') {
                    //     showWarnMsg('当前不是省分公司总经理审核的节点');
                    } else {
                        this.props.history.push(`/loan/budget/detail?isCompCheck=1&v=1&code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    // } else if (selectedRows[0].curNodeCode !== '002_04') {
                    //     showWarnMsg('当前不是准入审核二审的节点');
                    } else {
                        this.props.history.push(`/loan/budget/detail?isCheck=1&v=1&code=${selectedRowKeys[0]}`);
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

export default BudgetCheck;
