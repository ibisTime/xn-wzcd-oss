import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/loanstools/estimate-check';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.loanstoolsEstimateCheck, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class EstimateCheck extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      isRemark: false
    };
  }
  render() {
    const fields = [{
      title: '业务公司',
      field: 'companyCode',
      readonly: true
    }, {
      title: '收款银行',
      field: 'receiptBank',
      readonly: true
    }, {
      title: '收款账号',
      field: 'receiptAccount',
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
      title: '审核意见',
      field: 'approveNote',
      required: true,
      type: 'select',
      key: 'approve_note',
      onChange: (v) => {
          this.setState({
              isRemark: v === '99'
          });
      }
  }, {
      title: '备注',
      field: 'remark',
      required: true,
      hidden: !this.state.isRemark
  }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632106,
      buttons: [{
        title: '通过',
        handler: (param) => {
          param.approveResult = '1';
          param.operator = getUserId();
          this.props.doFetching();
          fetch(632101, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.props.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '不通过',
        handler: (param) => {
          param.approveResult = '0';
          param.approveNote = this.projectCode;
          param.operator = getUserId();
          this.props.doFetching();
          fetch(632101, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.props.cancelFetching);
        },
        check: true
      }, {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}

export default EstimateCheck;
