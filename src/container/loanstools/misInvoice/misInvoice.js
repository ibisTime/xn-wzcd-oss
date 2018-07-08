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
} from '@redux/loanstools/misInvoice';
import {
  showWarnMsg,
  showSucMsg,
  dateTimeFormat
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
        ...state.loanstoolsMisInvoice,
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
class misInvoice extends React.Component {
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
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '汽车经销商',
            field: 'carDealerName',
            search: true
        }, {
            title: '车辆型号',
            field: 'carModel'
        }, {
            title: '车辆价格',
            field: 'originalPrice',
            amount: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '期数',
            field: 'loanPeriods'
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '银行利率',
            field: 'bankRate'
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
            valueName: 'value',
            search: true
        }, {
            title: '业务员',
            field: 'saleUserName'
        }, {
            title: '银行经办支行',
            field: 'insuranceBank'
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            key: 'budget_orde_biz_typer'
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            rangedate: ['applyDateStart', 'applyDateEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
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
              roleCode: getRoleCode(),
              curNodeCodeList: ['010_01', '010_02', '010_03', '010_04']
            },
            btnEvent: {
              apply: (selectedRowKeys, selectedRows) => {
                  if (!selectedRowKeys.length) {
                      showWarnMsg('请选择记录');
                  } else if (selectedRowKeys.length > 1) {
                      showWarnMsg('请选择一条记录');
                  } else {
                      this.props.history.push(`/loanstools/misInvoice/apply?code=${selectedRowKeys[0]}`);
                  }
              },
              check: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/misInvoice/check?code=${selectedRowKeys[0]}`);
                }
              },
              checkTwo: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/misInvoice/checkTwo?code=${selectedRowKeys[0]}`);
                }
              },
              certain: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/misInvoice/certain?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default misInvoice;