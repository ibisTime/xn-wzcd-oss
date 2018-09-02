import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/trailer-cashier';
import {
    getQueryString,
    moneyFormat,
    getUserId,
    showSucMsg,
    getCompanyCode
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizTrailerCashier, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TrailerCashier extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.budgetOrder.code;
            },
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            amount: 'true',
            readonly: true
        }, {
            title: '代偿欠款',
            field: 'restReplaceRepayAmount',
            amount: 'true',
            readonly: true
        }, {
            title: '处理结果',
            field: 'dealResult',
            type: 'select',
            key: 'deal_result',
            readonly: true,
            hidden: true
        }, {
            title: '代偿预算单',
            field: 'ReplaceRepayCode',
            listCode: 632327,
            parmas: {
                status: 4,
                bizCode: this.code
            },
            keyName: 'code',
            valueName: '{{receiptRealName.DATA}}-{{code.DATA}}',
            readonly: true,
            hidden: true
        }, {
            title: '附件',
            field: 'dealEnclosure',
            type: 'img',
            readonly: true
        }, {
            title: '处理结果说明',
            field: 'remark',
            readonly: true
        }, {
            title: '付款银行',
            field: 'paymentBank',
            type: 'select',
            listCode: 632007,
            params: {
                type: '1',
                companyCode: getCompanyCode()
            },
            keyName: 'code',
            valueName: '{{bankcardNumber.DATA}}-{{realName.DATA}}',
            require: true
        }, {
            title: '付款凭证',
            field: 'paymentPdf',
            type: 'img',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521,
            buttons: [{
                title: '线下收取',
                handler: (param) => {
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(630559, param).then(() => {
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

export default TrailerCashier;
