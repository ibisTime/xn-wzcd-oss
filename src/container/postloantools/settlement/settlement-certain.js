import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/settlement-certain';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsSettlementCertain, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class settlementCertain extends React.Component {
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
        }, {
            title: '付款日期',
            field: 'useDatetime',
            type: 'date',
            required: true
        }, {
            title: '付款银行',
            field: 'useDatetime',
            required: true
        }, {
            title: '付款卡号',
            field: 'useDatetime',
            required: true
        }, {
            title: '付款凭证',
            field: 'useDatetime',
            type: 'img',
            required: true
        }, {
            title: '备注',
            field: 'remark'
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

export default settlementCertain;