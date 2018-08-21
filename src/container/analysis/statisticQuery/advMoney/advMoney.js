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
} from '@redux/analysis/advMoney';
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
        ...state.analysisAdvMoney,
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
            render: (v, data) => {
                return data.companyName ? data.companyName : '-';
            }
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '汽车经销商',
            field: 'carDealerCode',
            type: 'select',
            pageCode: 632065,
            keyName: 'code',
            valueName: '{{parentGroup.DATA}}-{{fullName.DATA}}',
            search: true,
            render: (v, data) => {
                return data.carDealerName ? data.carDealerName : '-';
            }
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
            title: '应退按揭合计',
            field: 'loanBalance',
            amount: true
        }, {
            title: '代偿金额',
            field: 'loanBalance2',
            amount: true
        }, {
            title: '利率类型',
            field: 'rateType',
            type: 'select',
            key: 'rate_type'
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
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date'
        }, {
            title: '垫资天数',
            field: 'advanceDays'
        }, {
            title: '业务员',
            field: 'saleUserName'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632910
        });
    }
}

export default AdvMoney;