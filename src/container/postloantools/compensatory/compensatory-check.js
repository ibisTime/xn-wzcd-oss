import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/compensatory-check';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsCompensatoryCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class compensatoryCheck extends React.Component {
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
            title: '偿还类型',
            field: 'budgetAmount',
            readonly: true
        }, {
            title: '预算金额',
            field: 'budgetAmount',
            amount: true,
            readonly: true
        }, {
            title: '预算金额大写',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '收款人姓名',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '收款人开户行',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '收款人账号',
            field: 'useDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '是否加急',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '代偿说明',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '已代偿金额',
            field: 'budgetAmount',
            amount: true,
            readonly: true
        }, {
            title: '代偿清单',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '与我司过往是否有纠纷',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '垫款后采取的方式',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '暂缓起诉(天)',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '申请垫款理由',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '欠款人及配偶信息',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '担保人信息及其名下财产信息',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '特殊情况说明',
            field: 'useDatetime',
            required: true
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

export default compensatoryCheck;