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
            field: 'code'
        }, {
            title: '业务公司',
            field: 'companyCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'companyCode',
            search: true
        }, {
            title: '贷款额',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '垫资日期',
            field: 'useDatetime',
            type: 'datetime'
        }, {
            title: '发保和预警天数',
            field: 'name',
            search: true
        }, {
            title: '车辆发票价',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '新发票价格',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '状态',
            field: 'budgetAmount',
            amount: true
        }, {
            title: '更新人',
            field: 'budgetAmount'
        }, {
            title: '跟新时间',
            field: 'useDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'budgetAmount',
            amount: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632105,
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