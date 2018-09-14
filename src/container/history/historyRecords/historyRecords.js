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
    moneyFormat,
    formatDate,
    showWarnMsg
} from 'common/js/util';

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
    constructor(props) {
        super(props);
        this.shopWayArr = ['新车', '二手车'];
        this.isflag = ['否', '是'];
    }
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
            field: 'realName',
            search: true
        }, {
            title: '身份证号',
            field: 'idNo',
            search: true,
            nowrap: true
        }, {
            title: '购车途径',
            field: 'shopWay',
            render: (v, d) => {
                return this.shopWayArr[d.budgetOrder.shopWay];
            },
            type: 'select',
            key: 'budget_orde_biz_typer',
            search: true
        }, {
            title: '汽车经销商',
            field: 'carDealerCode',
            render: (v, d) => {
                return d.budgetOrder.carDealerName;
            },
            type: 'select',
            listCode: 632067,
            params: {
                agreementStatus: '1'
            },
            keyName: 'code',
            valueName: '{{parentGroup.DATA}}-{{abbrName.DATA}}',
            search: true
        }, {
            title: '车辆型号',
            field: 'carModel',
            render: (v, d) => {
                return d.budgetOrder.carModel;
            }
        }, {
            title: '车辆价格',
            field: 'invoicePrice',
            render: (v, d) => {
                return moneyFormat(d.budgetOrder.invoicePrice);
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
            render: (v, d) => {
                return this.isflag[d.budgetOrder.isAdvanceFund];
            },
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
            title: '垫资日期',
            field: 'advanceFundDatetime',
            render: (v, d) => {
                return formatDate(d.budgetOrder.advanceFundDatetime);
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
            pageCode: 630520,
            searchParams: {
                enterFileStatus: '2',
                curNodeCodeList: ['020_15', '021_24', '021_25']
            },
            btnEvent: {
              detail: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/history/historyRecords/addedit?code=${selectedRows[0].budgetOrder.code}&afterCode=${selectedRowKeys[0]}&v=1`);
                }
              }
            }
        });
    }
}

export default HistoryBusiness;