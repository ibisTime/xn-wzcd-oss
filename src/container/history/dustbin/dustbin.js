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
} from '@redux/history/dustbin';
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
        ...state.historyDustbin,
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
class Dustbin extends React.Component {
    render() {
        const fields = [{
            title: '银行',
            field: 'loanBankName'
        }, {
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
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '身份证',
            field: 'idNo'
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '车辆型号',
            field: 'carModel',
            type: 'select',
            listCode: 630426,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '车辆价格',
            field: 'invoicePrice',
            amount: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '剩余欠款',
            field: ''
        }, {
            title: '总期数',
            field: 'loanPeriod'
        }, {
            title: '剩余期数',
            field: ''
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '放款日期',
            field: 'bankFkDatetime',
            type: 'date'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
                roleCode: getRoleCode(),
                curNodeCodeList: ['012_04']
            }
        });
    }
}

export default Dustbin;