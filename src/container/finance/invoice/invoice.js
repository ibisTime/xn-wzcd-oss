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
} from '@redux/finance/invoice';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    dateTimeFormat,
    getRoleCode
} from 'common/js/util';
import {
    Modal
} from 'antd';
import {
    rebateList
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.financeInvoice,
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
class Invoice extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'budgetCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName'
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '业务员',
            field: 'saleUserName'
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{abbrName.DATA}}',
            search: true,
            render: (v, data) => {
                return data.loanBankName ? data.loanBankName : '-';
            }
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '履约保证金',
            field: 'lyAmount',
            amount: true
        }, {
            title: '放款日期',
            field: 'fkDatetime',
            type: 'date'
        }, {
            title: '收款打印单号',
            field: 'applyUserName'
        }, {
            title: '收款打印日期',
            field: 'applyDatetime',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 632905
        });
    }
}

export default Invoice;