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
} from '@redux/analysis/carLoanInstallment';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    formatDate
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.analysisCarLoanInstallment,
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
class CarLoanInstallment extends React.Component {
    render() {
        const fields = [{
            title: '分公司名称',
            field: 'companyName'
        }, {
            title: '上日余额',
            field: 'preBalance',
            amount: true
        }, {
            title: '上日逾期率',
            field: 'preOverdueRate'
        }, {
            title: '借方发生额',
            field: 'debitAmount',
            amount: true
        }, {
            title: '贷方发生额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '当日余额',
            field: 'balance',
            amount: true
        }, {
            title: '当日逾期率',
            field: 'overdueRate'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630901
        });
    }
}

export default CarLoanInstallment;