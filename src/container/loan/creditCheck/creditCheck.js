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
} from '@redux/loan/creditCheck';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode
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
        ...state.loanCreditCheck,
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
class CreditCheck extends React.Component {
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'userName',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.userName : '-');
            }
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName'
        }, {
            title: '手机号',
            field: 'mobile',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.mobile : '-');
            }
        }, {
            title: '身份证号',
            field: 'idNo',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.idNo : '-');
            }
            // }, {
            //     title: '业务员',
            //     field: 'salesman',
            //     render: (e, t) => {
            //         return (t.creditUser ? t.creditUser.idNo : '-');
            //     }
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632115,
            searchParams: {
                roleCode: getRoleCode()
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/creditStart/addedit?v=1&isCheckFirst=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default CreditCheck;