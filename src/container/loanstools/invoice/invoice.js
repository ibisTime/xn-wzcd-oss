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
} from '@redux/loanstools/invoice';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    formatDate
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
        ...state.loanstoolsInvoice,
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
class invoice extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode'
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '贷款额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '垫资日期',
            field: 'advanceFundDatetime',
            render: (v, d) => {
                return formatDate(d.advanceFund.advanceFundDatetime);
            }
        }, {
            title: '发保合预警天数',
            field: 'fbhWarnDay',
            render: (v, d) => {
                return formatDate(d.advanceFund.fbhWarnDay);
            }
        }, {
            title: '车辆发票价',
            field: 'invoicePrice',
            amount: true
        }, {
            title: '新发票价格',
            field: 'currentInvoicePrice',
            amount: true
        }, {
            title: '状态',
            field: 'fbhStatus',
            type: 'select',
            data: [{
                key: '2',
                value: '已录入'
            }, {
                key: '0',
                value: '待录入'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '备注',
            field: 'fbhRemark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            searchParams: {
                roleCode: getRoleCode()
            },
            btnEvent: {
                entering: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].fbhStatus === '1') {
                        showWarnMsg('已录入不能再次录入');
                    } else {
                        this.props.history.push(`/loanstools/invoice/enter?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default invoice;