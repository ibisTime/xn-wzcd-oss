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
            field: 'code'
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
            field: 'realName',
            render: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '身份证',
            field: 'idNo',
            render: (v, d) => {
                return d.user.idNo;
            }
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '车辆型号',
            field: 'carModel',
            render: (v, d) => {
                return d.budgetOrder.carModel;
            }
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
            field: 'fkDatetime',
            type: 'date'
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            type: 'date',
            required: true
        }, {
            title: '利差',
            field: 'advanceFundDatetime',
            amount: true
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
            pageCode: 630520,
            searchParams: {
                curNodeCodeList: ['021_18', '021_19', '020_13']
            }
        });
    }
}

export default Historying;