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
            field: 'company',
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
            field: 'car',
            title: '车辆型号'
        }, {
            field: 'price',
            title: '车辆价格',
            amount: true
        }, {
            field: 'loanAmount',
            title: '贷款金额',
            amount: true
        }, {
            field: 'times',
            title: '期数'
        }, {
            field: 'bank',
            title: '贷款银行',
            search: true
        }, {
            field: 'rate',
            title: '银行利率'
        }, {
            field: 'dz',
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
            field: 'bankSub',
            title: '银行经办支行'
        }, {
            field: 'buyWay',
            title: '购车途径'
        }, {
            field: 'updateDatetime',
            title: '申请时间',
            type: 'date',
            rangedate: ['start_datetime', 'end_datetime'],
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
            pageCode: 632145,
            searchParams: {
                roleCode: getRoleCode()
            },
            btnEvent: {
                areaCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/budget/addedit?isAreaCheck=1&v=1&code=${selectedRowKeys[0]}`);
                    }
                },
                compCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/budget/addedit?isCompCheck=1&v=1&code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/budget/addedit?isCheck=1&v=1&code=${selectedRowKeys[0]}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/budget/addedit?v=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default BudgetCheck;
