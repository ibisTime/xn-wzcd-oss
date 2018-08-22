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
} from '@redux/analysis/schedule';
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
        ...state.analysisSchedule,
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
            title: '客户类型',
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
            title: '车辆型号',
            field: 'carModel'
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
            title: '应退按揭合计',
            field: 'shouldBackAmount',
            amount: true
        }, {
            title: '期数',
            field: 'loanPeriods'
        }, {
            title: '利率类型',
            field: 'rateType',
            type: 'select',
            key: 'rate_type'
        }, {
            title: '公司履约保证金',
            field: 'lyAmount',
            amount: true
        }, {
            title: '公司担保风险金',
            field: 'fxAmount',
            amount: true
        }, {
            title: '公司GPS收费',
            field: 'gpsFee',
            amount: true
        }, {
            title: '杂费',
            field: 'otherFee',
            amount: true
        }, {
            title: '服务费',
            field: 'fee',
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
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '利差',
            field: 'lic'
        }, {
            title: '合同编号',
            field: 'htbc'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630910
        });
    }
}

export default Balancedetail;