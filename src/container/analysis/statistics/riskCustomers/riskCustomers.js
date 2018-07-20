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
            field: 'name',
            render: (v, d) => {
                if(d.user !== undefined) {
                    return d.user.realName;
                }
            },
            search: true
        }, {
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '借款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '借款余额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '月供',
            field: 'loanAmount'
        }, {
            title: '银行欠款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '公司垫款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '欠款合计',
            field: 'loanAmount',
            amount: true
        }, {
            title: '客户类别',
            field: 'loanAmount'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630520
        });
    }
}

export default Balancedetail;