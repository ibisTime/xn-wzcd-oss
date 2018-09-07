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
} from '@redux/analysis/riskCustomers';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    formatDate
} from 'common/js/util';
import {
    lowerFrame,
    onShelf
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.analysisRiskCustomers,
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
class Balancedetail extends React.Component {
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            search: true,
            noVisible: true
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{abbrName.DATA}}',
            search: true,
            noVisible: true
        }, {
            title: '借款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '借款余额',
            field: 'debtBalance',
            amount: true
        }, {
            title: '月供',
            field: 'repayMonthAmount',
            amount: true
        }, {
            title: '剩余欠款金额',
            field: 'bankDebtAmount',
            amount: true
        }, {
            title: '公司垫款金额',
            field: 'replaceRealRepayAmount',
            amount: true
        }, {
            title: '欠款合计',
            field: 'debtTotal',
            amount: true
        }, {
            title: '客户类别',
            field: 'customerType',
            type: 'select',
            data: [{
                key: '1',
                value: '个人'
            }, {
                key: '2',
                value: '企业'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630906
        });
    }
}

export default Balancedetail;