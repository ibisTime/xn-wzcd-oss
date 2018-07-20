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
    showSucMsg
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
            field: 'loanBank',
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
            field: 'loanBank',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{fullName.DATA}}',
            search: true
        }, {
            title: '汽车经销商',
            field: 'loanAmount',
            type: 'select',
            search: true
        }, {
            title: '车辆型号',
            field: 'loanAmount',
            amount: true
        }, {
            title: '车辆价格',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '剩余欠款',
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
            field: 'fkDatetime',
            type: 'date'
        }, {
            title: '垫资日期',
            field: 'fkDatetime'
        }, {
            title: '状态',
            field: 'loanAmount',
            amount: true,
            type: 'select',
            search: true
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