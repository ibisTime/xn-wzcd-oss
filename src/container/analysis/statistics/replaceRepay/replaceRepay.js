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
} from '@redux/analysis/replaceRepay';
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
        ...state.analysisReplaceRepay,
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
            title: '借款人',
            field: 'customerName',
            search: true
        }, {
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '借款金额',
            field: 'shouldBackAmount',
            amount: true
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date'
        }, {
            title: '放款日期',
            field: 'bankFkDatetime',
            type: 'date'
        }, {
            title: '月供还款日',
            field: 'repayMonthDatetime'
        }, {
            title: '月供金额',
            field: 'repayMonthAmount',
            amount: true
        }, {
            title: '当期欠款',
            field: 'overplusAmount',
            amount: true
        }, {
            title: '欠款期数',
            field: 'totalOverdueCount'
        }, {
            title: '借款余额',
            field: 'debtBalance',
            amount: true
        }, {
            title: '代偿金额',
            field: 'replaceRealRepayAmount',
            amount: true
        }, {
            title: '其他欠款',
            field: 'otherDebt',
            amount: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630903
        });
    }
}

export default Balancedetail;