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
} from '@redux/analysis/advance';
import {
    listWrapper
} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.analysisAdvance,
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
class Advance extends React.Component {
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
            field: 'bankReceiptName',
            noVisible: true
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date'
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '申请日期',
            field: 'updateDatetime',
            type: 'date'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630905
        });
    }
}

export default Advance;
