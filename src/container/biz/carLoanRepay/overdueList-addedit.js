import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/overdueList-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizOverdueListAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class overdueListAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '贷款人',
      field: 'name',
      readonly: true,
      formatter: (v, d) => {
        return d.user.realName;
      }
    }, {
      title: '手机号',
      field: 'mobile',
      readonly: true,
      formatter: (v, d) => {
        return d.user.mobile;
      }
    }, {
      title: '期数',
      field: 'periods',
      readonly: true
    }, {
      title: '逾期期数',
      field: 'curPeriods',
      readonly: true
    }, {
      title: '逾期日期',
      field: 'repayDatetime',
      type: 'date',
      readonly: true
    }, {
      title: '处理历史',
      field: 'remindLogList',
      type: 'o2m',
      options: {
        add: true,
        edit: true,
        delete: true,
        fields: [{
          title: '催收方式',
          field: 'way',
          type: 'select',
          select: true,
          key: 'way'
        }, {
          title: '催收对象',
          field: 'toUser'
        }, {
          title: '催收文本',
          field: 'content'
        }, {
          title: '催收时间',
          field: 'createDatetime'
        }]
      }
    }, {
      title: '再次逾期保证金',
      field: 'overdueDeposit'
    }, {
      title: '再次逾期保证金收取方式',
      field: 'overdueDepositWay',
      type: 'select',
      select: true,
      key: 'repay_way'
    }, {
      title: '清收成本清单',
      field: 'costList',
      type: 'o2m',
      options: {
        add: true,
        edit: true,
        delete: true,
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
          title: '备注',
          field: 'remark'
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

export default overdueListAddedit;