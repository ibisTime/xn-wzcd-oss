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
  showSucMsg
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
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
            field: 'useDatetime',
            type: 'datetime'
        }, {
            title: '发保合预警天数',
            field: 'name'
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
            field: 'fbhstatus',
            type: 'select',
            data: [{
                key: '1',
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
            btnEvent: {
              entering: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/invoice/enter?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default invoice;