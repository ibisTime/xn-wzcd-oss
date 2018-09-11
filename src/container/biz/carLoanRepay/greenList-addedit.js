import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/greenList-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizGreenListAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class greenListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '业务编号',
      field: 'code',
      formatter: (v, d) => {
        return d.repayBiz.budgetOrder.code;
      },
      readonly: true
    }, {
      field: 'user',
      title: '客户姓名',
      formatter: (v, d) => {
        return d.user.realName;
      },
      readonly: true
    }, {
      title: '逾期日期',
      field: 'repayDatetime',
      type: 'date',
      readonly: true
    }, {
      title: '未还清收成本(元)',
      field: 'notPayedFee',
      amount: true
    }, {
      title: '清收成本清单',
      field: 'costList',
      type: 'o2m',
      options: {
        noSelect: true,
        fields: [{
          title: '费用项',
          field: 'item'
        }, {
          title: '金额（元）',
          field: 'amount',
          amount: true
        }, {
          title: '发生时间',
          field: 'payDatetime',
          type: 'date'
        }, {
          title: '状态',
          field: 'status',
          type: 'select',
          key: 'cost_status'
        }, {
          title: '备注',
          field: 'remark'
        }]
      }
    }, {
      title: '流程日志',
      field: 'list',
      type: 'o2m',
      listCode: 630176,
      params: {
        refOrder: this.code
      },
      options: {
        rowKey: 'id',
        noSelect: true,
        fields: [{
          title: '操作人',
          field: 'operatorName'
        }, {
          title: '开始时间',
          field: 'startDatetime',
          type: 'datetime'
        }, {
          title: '结束时间',
          field: 'endDatetime',
          type: 'datetime'
        }, {
          title: '花费时长',
          field: 'speedTime'
        }, {
          title: '审核意见',
          field: 'dealNote'
        }, {
          title: '当前节点',
          field: 'dealNode',
          type: 'select',
          listCode: 630147,
          keyName: 'code',
          valueName: 'name'
        }]
      }
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 630541
      });
  }
}

export default greenListAddedit;