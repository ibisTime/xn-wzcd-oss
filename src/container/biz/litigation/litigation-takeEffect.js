import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation/litigation-takeEffect';
import {
    getQueryString,
    getUserId,
    moneyFormat,
    formatDate,
    formatImg
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationTakeEffect, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class LitigationTakeEffect extends React.Component {
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
            formatter: (v, d) => {
                return d.budgetOrder.code;
            },
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
            field: 'loanBankName',
            readonly: true
        }, {
            title: '原告',
            field: 'plaintiff',
            formatter: (v, d) => {
                return d.judge.plaintiff;
            },
            type: 'select',
            key: 'plaintiff',
            readonly: true
        }, {
            title: '被告',
            field: 'defendant',
            formatter: (v, d) => {
                return d.judge.defendant;
            },
            readonly: true
        }, {
            title: '案款',
            field: 'caseFee',
            formatter: (v, d) => {
                return moneyFormat(d.judge.caseFee);
            },
            readonly: true
        }, {
            title: '受理时间',
            field: 'acceptanceTime',
            formatter: (v, d) => {
                return formatDate(d.judge.acceptanceTime);
            },
            readonly: true
        }, {
            title: '受理费',
            field: 'acceptanceFee',
            formatter: (v, d) => {
                return moneyFormat(d.judge.acceptanceFee);
            },
            amount: true,
            readonly: true
        }, {
            title: '受理案号',
            field: 'caseNumber',
            formatter: (v, d) => {
                return d.judge.caseNumber;
            },
            readonly: true
        }, {
            title: '经办法官',
            field: 'handleJudge',
            formatter: (v, d) => {
                return d.judge.handleJudge;
            },
            readonly: true
        }, {
            title: '传票等送达日期',
            field: 'summonsDeliveryTime',
            formatter: (v, d) => {
                return formatDate(d.judge.summonsDeliveryTime);
            },
            readonly: true
        }, {
            title: '开庭日期',
            field: 'courtDatetime',
            formatter: (v, d) => {
                return formatDate(d.judge.courtDatetime);
            },
            readonly: true
        }, {
            title: '开庭地点',
            field: 'courtAddress',
            formatter: (v, d) => {
                return d.judge.courtAddress;
            },
            readonly: true
        }, {
            title: '判决书送达时间',
            field: 'judgePdfDeliveryTime',
            formatter: (v, d) => {
                return formatDate(d.judge.judgePdfDeliveryTime);
            },
            readonly: true
        }, {
            title: '判决书',
            field: 'judgePdf',
            formatter: (v, d) => {
                return d.judge.judgePdf;
            },
            type: 'img',
            readonly: true
        }, {
            title: '生效时间',
            field: 'effectiveTime',
            type: 'date',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630569,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.repayBizCode = this.code;
                params.operator = getUserId();
                return params;
            }
        });
    }
}

export default LitigationTakeEffect;