import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/take-finance';
import {
    getQueryString,
    showSucMsg,
    showWarnMsg,
    getUserId,
    getCompanyCode,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsTakeFinance, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TakeFinance extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '业务类型',
            field: 'type',
            type: 'select',
            data: [{
                key: '1',
                value: '客户作废'
            }, {
                key: '2',
                value: '垫资款退回'
            }],
            keyName: 'key',
            valueName: 'value',
            readonly: true
        }, {
            title: '付款金额',
            field: 'zfSkAmount',
            amount: true,
            readonly: true
        }, {
            title: '付款账号',
            field: 'zfSkBankcardCode',
            readonly: true
        }, {
            title: '付款时间',
            field: 'zfSkReceiptDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '附件',
            field: 'billPdf',
            type: 'img',
            required: true
        }, {
            title: '审核说明',
            field: 'approveNote',
            type: 'textarea',
            normalArea: true,
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.approveResult = '1';
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632281, param).then(() => {
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
                param.operator = getUserId();
                this.props.doFetching();
                fetch(632281, param).then(() => {
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

export default TakeFinance;