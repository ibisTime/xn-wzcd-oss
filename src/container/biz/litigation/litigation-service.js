import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation/litigation-service';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    formatDate
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizLitigationService, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class LitigationService extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
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
            type: 'select',
            key: 'plaintiff',
            readonly: true
        }, {
            title: '被告',
            field: 'defendant',
            type: 'select',
            pageCode: 632119,
            params: {
                isFirstAudit: '1',
                creditCode: this.bizCode
            },
            keyName: 'userName',
            valueName: 'userName',
            multiple: true,
            readonly: true
        }, {
            title: '诉讼费',
            field: 'caseFee',
            amount: true,
            readonly: true
        }, {
            title: '受理时间',
            field: 'acceptanceTime',
            type: 'date',
            readonly: true
        }, {
            title: '受理费',
            field: 'acceptanceFee',
            amount: true,
            readonly: true
        }, {
            title: '受理案号',
            field: 'caseNumber',
            readonly: true
        }, {
            title: '经办法官',
            field: 'handleJudge',
            required: true
        }, {
            title: '传票等送达日期',
            field: 'summonsDeliveryTime',
            type: 'date',
            required: true
        }, {
            title: '开庭日期',
            field: 'courtDatetime',
            type: 'date',
            required: true
        }, {
            title: '开庭地点',
            field: 'courtAddress',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 630565,
            detailCode: 630521,
            beforeSubmit: (params) => {
                params.operator = getUserId();
                params.repayBizCode = params.code;
                delete params.code;
                return params;
            }
        });
    }
}

export default LitigationService;