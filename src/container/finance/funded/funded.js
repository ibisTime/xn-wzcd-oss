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
} from '@redux/finance/funded';
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
        ...state.financeFunded,
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
class Funded extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'budgetCode',
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
            render: (v, data) => {
                return data.bizCompanyName ? data.bizCompanyName : '-';
            }
        }, {
            title: '客户姓名',
            field: 'customerName'
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
            title: '用款小写',
            field: 'useAmount',
            amount: true
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
            title: '收款单位名称',
            field: 'collectAccountName'
        }, {
            title: '账号',
            field: 'collectionAccountNo'
        }, {
            title: '开户银行',
            field: 'collectSubbranch'
        }, {
            title: '打款日期',
            field: 'advanceFundDatetime',
            type: 'date'
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '申请人',
            field: 'applyUserName'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '办理状态',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632179
        });
    }
}

export default Funded;