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
} from '@redux/loan/creditStart';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanCreditStart,
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
class CreditStart extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'creditCode'
        }, {
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '客户姓名',
            field: 'loanName'
        }, {
            title: '贷款银行',
            field: 'loanBank'
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '身份证号',
            field: 'idNo'
        }, {
            title: '业务员',
            field: 'salesman'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '办理状态',
            field: 'status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105
        });
    }
}

export default CreditStart;