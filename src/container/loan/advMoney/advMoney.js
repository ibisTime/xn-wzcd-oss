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
} from '@redux/loan/advMoney';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    moneyUppercase,
    moneyFormat
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.loanAdvMoney,
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
class AdvMoney extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'budgetCode',
            search: true
        }, {
            title: '业务公司',
            field: 'bizCompanyName',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            search: true
        }, {
            title: '用款小写',
            field: 'useAmount',
            amount: true
        }, {
            title: '用款大写',
            field: 'money',
            render: (v, d) => {
                return moneyUppercase(moneyFormat(d.useAmount));
            }
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '收款银行账号',
            field: 'collectionAccountNo'
        }, {
            title: '收款银行',
            field: 'collectBankName'
        }, {
            title: '打款日期',
            field: 'advanceFundDatetime',
            type: 'date'
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '申请日期',
            field: 'updateDatetime',
            type: 'date'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632185,
            searchParams: {
              roleCode: getRoleCode(),
              curNodeCodeList: ['003_01', '003_02', '003_03', '003_06', '004_01', '004_02', '004_03', '004_07']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '003_01' && selectedRows[0].curNodeCode !== '004_01') {
                        showWarnMsg('当前节点不是确认用款单');
                    } else {
                        this.props.history.push(`/loan/advMoney/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                areaCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '003_02' && selectedRows[0].curNodeCode !== '004_02') {
                        showWarnMsg('当前节点不是区域总经理审核');
                    } else {
                        this.props.history.push(`/loan/advMoney/areaCheck?code=${selectedRowKeys[0]}`);
                    }
                },
                compCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '003_03' && selectedRows[0].curNodeCode !== '004_03') {
                        showWarnMsg('当前节点不是省分经理审核');
                    } else {
                        this.props.history.push(`/loan/advMoney/compCheck?code=${selectedRowKeys[0]}`);
                    }
                },
                revoke: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/advMoney/revoke?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default AdvMoney;
