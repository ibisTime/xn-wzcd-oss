import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/estimate-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId,
  getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsEstimateCertian, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class EstimateCertain extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '预算单号',
      field: 'code',
      readonly: true
    }, {
      title: '业务公司',
      field: 'companyName',
      readonly: true
    }, {
      title: '收款银行',
      field: 'bankName',
      readonly: true
    }, {
      title: '收款账号',
      field: 'bankcardNumber',
      readonly: true
    }, {
      title: '预算金额',
      field: 'budgetAmount',
      amount: true,
      readonly: true
    }, {
      title: '用款日期',
      field: 'useDatetime',
      type: 'date',
      readonly: true
    }, {
      title: '打款时间',
      field: 'payDatetime',
      type: 'datetime',
      required: true
    }, {
      title: '打款账号',
      field: 'payAccount',
      type: 'select',
      listCode: '632007',
      params: {
        companyCode: getCompanyCode(),
        type: '1'
      },
      keyName: 'code',
      valueName: '{{bankName.DATA}} {{subbranch.DATA}} {{bankcardNumber.DATA}}'
    }, {
      title: '打款金额',
      field: 'payAmount',
      amount: true,
      required: true
    }, {
      title: '水单',
      field: 'waterBill',
      type: 'img',
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632106,
      buttons: [{
        title: '确认',
        check: true,
        handler: (params) => {
          this.props.doFetching();
          params.operator = getUserId();
          fetch(632102, params).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.props.cancelFetching);
        }
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}

export default EstimateCertain;
