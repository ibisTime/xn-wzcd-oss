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
} from '@redux/loan/budget';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.loanBudget,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Budget extends React.Component {
  render() {
    const fields = [{
      field: 'code',
      title: '业务编号',
      search: true
    }, {
      field: 'company',
      title: '业务公司',
      search: true
    }, {
      field: 'name',
      title: '客户姓名',
      search: true
    }, {
      field: 'jsx',
      title: '汽车经销商',
      search: true
    }, {
      field: 'car',
      title: '车辆型号'
    }, {
      field: 'price',
      title: '车辆价格',
      amount: true
    }, {
      field: 'loanAmount',
      title: '贷款金额',
      amount: true
    }, {
      field: 'times',
      title: '期数'
    }, {
      field: 'bank',
      title: '贷款银行',
      search: true
    }, {
      field: 'rate',
      title: '银行利率'
    }, {
      field: 'dz',
      title: '是否垫资',
      type: 'select',
      data: [{
        dkey: '0',
        dvalue: '否'
      }, {
        dkey: '1',
        dvalue: '是'
      }],
      keyName: 'dkey',
      valueName: 'dvalue',
      search: true
    }, {
      field: 'member',
      title: '业务员'
    }, {
      field: 'bankSub',
      title: '银行经办支行'
    }, {
      field: 'buyWay',
      title: '购车途径'
    }, {
      field: 'updateDatetime',
      title: '申请时间',
      type: 'datetime',
      search: true
    }, {
      field: 'status',
      title: '办理状态'
    }, {
      field: 'remark',
      title: '备注'
    }];
    const btnEvent = {
      apply: (keys, items) => {
        if (!keys || !keys.length || !items || !items.length) {
          showWarnMsg('请选择记录');
        } else if (items[0].status !== '1') {
          showWarnMsg('该状态不可下架');
        } else {
        }
      }
    };
    return this.props.buildList({
      fields,
      pageCode: 630035,
      rowKey: 'id'
    });
  }
}

export default Budget;
