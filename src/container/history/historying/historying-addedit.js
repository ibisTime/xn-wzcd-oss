import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/history/historying-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.historyHistoryingAddedit, {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
})
class HistoryingAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  goDetail(data) {
    this.props.history.push('/biz/historyBusinessManage/addedit/addedit?code=' + data);
  }
  render() {
    const fields = [{
      title: '客户姓名',
      field: 'applyUserName',
      readonly: true
    }, {
      title: '业务编号',
      field: 'code',
      readonly: true
    }, {
      title: '贷款金额',
      field: 'loanAmount',
      amount: true,
      readonly: true
    }, {
      title: '贷款银行',
      field: 'loanBankName'
    }, {
      title: '贷款期数',
      field: 'loanPeriods'
    }, {
      title: '还款计划表',
      field: 'repayPlanList',
      type: 'o2m',
      options: {
        fields: [{
          title: '当前期数',
          field: 'curPeriods'
        }, {
          title: '应还本息',
          field: 'repayInterest',
          render: (v, d) => {
            return (d.repayCapital + d.repayInterest) / 1000;
          }
        }, {
          title: '实还金额',
          field: 'payedAmount',
          amount: true
        }, {
          title: '逾期金额',
          field: 'overdueAmount',
          amount: true
        }, {
          title: '还款日期',
          field: 'repayDatetime',
          type: 'date'
        }, {
          title: '剩余欠款',
          field: 'overplusAmount',
          amount: true
        }]
      }
    }];
    return this
      .props
      .buildDetail({
        fields,
        code: this.code,
        view: this.view,
        detailCode: 632146
      });
  }
}

export default HistoryingAddedit;