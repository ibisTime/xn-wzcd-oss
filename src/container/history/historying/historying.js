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
} from '@redux/history/historying';
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
    ...state.historyHistorying,
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
class Historying extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyName',
            required: true
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            search: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            field: 'shopWay',
            title: '购车途径',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            field: 'carModel',
            title: '车辆型号'
        }, {
            title: '车辆价格',
            field: 'originalPrice',
            amount: true
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '0',
                value: '是'
            }, {
                key: '1',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            title: '总期数',
            field: 'loanPeriods'
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
            valueName: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            searchParams: {
                curNodeCodeList: [
                    '002_01',
                    '002_02',
                    '002_03',
                    '002_04',
                    '002_05',
                    '002_06',
                    '007_01',
                    '007_02',
                    '007_03',
                    '007_04',
                    '007_05',
                    '008_01',
                    '008_02',
                    '008_03',
                    '008_04',
                    '008_05',
                    '009_01',
                    '009_02',
                    '009_03',
                    '009_04',
                    '009_05',
                    '009_06',
                    '010_01',
                    '010_02'
                ]
            }
        });
    }
}

export default Historying;