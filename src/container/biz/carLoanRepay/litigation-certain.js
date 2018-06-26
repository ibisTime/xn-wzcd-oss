import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation-certain';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationCertain, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class litigationCertain extends React.Component {
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
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            readonly: true
        }, {
            title: '收款时间',
            field: 'judgeReceiptDatetime',
            type: 'date',
            required: true
        }, {
            title: '贷款金额',
            field: 'judgeReceiptAmount',
            amount: true,
            required: true
        }, {
            title: '收款账号',
            field: 'judgeReceiptBankcard',
            type: 'select',
            listCode: 632007,
            params: {
                type: 1
            },
            keyName: 'bankcardNumber',
            valueName: '{{bankName.DATA}}-{{bankcardNumber.DATA}}',
            required: true,
            onChange: (v, data) => {
                this.props.form.setFieldsValue({
                    judgeReceiptBank: data.bankCode
                });
            }
        }, {
            title: '收款银行',
            field: 'judgeReceiptBank',
            hidden: true
        }, {
            title: '收款凭证',
            field: 'judgeBillPdf',
            type: 'img',
            required: true
        }, {
            title: '备注',
            field: 'judgeNote'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630563,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.code = this.code;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default litigationCertain;