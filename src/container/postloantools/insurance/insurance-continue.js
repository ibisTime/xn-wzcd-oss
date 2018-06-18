import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/insurance-continue';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsInsuranceContinue, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class insuranceContinue extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '身份证',
            field: '11',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '保险公司',
            field: 'insuranceCompanyCode',
            type: 'select',
            listCode: 632046,
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '投保时间',
            field: 'insuranceApplyDatetime',
            type: 'date',
            required: true
        }, {
            title: '到期日期',
            field: 'insuranceEndDatetime',
            type: 'date',
            required: true
        }, {
            title: '交强险保单',
            field: 'insuranceForcePdf',
            type: 'img',
            required: true
        }, {
            title: '商业险保单',
            field: 'insuranceBusinessPdf',
            type: 'img',
            required: true
        }, {
            title: '备注',
            field: 'insuranceNote'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
              title: '确认',
              handler: (param) => {
                param.code = this.code;
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632341, param).then(() => {
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
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default insuranceContinue;
