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
} from '@redux/history/historyRecords';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    formatDate
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    sendMsg
} from 'api/biz';

@listWrapper(state => ({
    ...state.historyHistoryRecords,
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
})
class HistoryBusiness extends React.Component {
    render() {
        const fields = [{
            title: '银行',
            field: 'loanBankName',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{fullName.DATA}}',
            search: true
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
            title: '身份证号',
            field: 'idNo',
            search: true
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            key: 'budget_orde_biz_typer',
            search: true
        }, {
            title: '汽车经销商',
            field: 'carDealerCode',
            type: 'select',
            pageCode: 632065,
            params: {
                curNodeCode: '006_02'
            },
            keyName: 'code',
            valueName: '{{parentGroup.DATA}}-{{abbrName.DATA}}',
            search: true
        }, {
            title: '车辆型号',
            field: 'carModel'
        }, {
            title: '车辆价格',
            field: 'invoicePrice',
            amount: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '总期数',
            field: 'periods'
        }, {
            title: '剩余期数',
            field: 'restPeriods'
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            amount: true
        }, {
            title: '放款日期',
            field: 'updater',
            render: (v, d) => {
                if(d.loanOrder !== undefined) {
                    return formatDate(d.loanOrder.fkDatetime);
                }
            }
        }, {
            title: '垫资日期',
            field: 'updater',
            render: (v, d) => {
                if(d.loanOrder !== undefined) {
                    return formatDate(d.loanOrder.fkDatetime);
                }
            }
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
            pageCode: 632145,
            searchParams: {
                enterFileStatus: '2'
            }
        });
    }
}

export default HistoryBusiness;