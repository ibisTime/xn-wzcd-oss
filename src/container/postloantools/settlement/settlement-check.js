import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/settlement-check';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsSettlementCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class settlementCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'companyCode',
            readonly: true
        }, {
            title: '业务编号',
            field: 'receiptBank',
            readonly: true
        }, {
            title: '身份证',
            field: 'receiptAccount',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'budgetAmount',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'budgetAmount',
            readonly: true
        }, {
            title: '征信结果',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '预算单信息',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '逾期记录',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '代偿记录',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '结清申请单',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '审核说明',
            field: 'useDatetime',
            required: true
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
                param.approveUser = getUserId();
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
                param.approveUser = getUserId();
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

export default settlementCheck;