import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/litigation/litigation-addedit';
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

@DetailWrapper(state => state.bizLitigationAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class litigationAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName'
        }, {
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.budgetOrder.code;
            }
        }, {
            title: '身份证',
            field: 'idNo'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '原告',
            field: 'plaintiff',
            type: 'select',
            key: 'plaintiff'
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
            multiple: true
        }, {
            title: '诉讼费',
            field: 'caseFee',
            amount: true
        }, {
            title: '受理时间',
            field: 'acceptanceTime',
            type: 'date'
        }, {
            title: '受理费',
            field: 'acceptanceFee',
            amount: true
        }, {
            title: '受理案号',
            field: 'caseNumber'
        }, {
            title: '经办法官',
            field: 'handleJudge'
        }, {
            title: '传票等送达日期',
            field: 'summonsDeliveryTime',
            type: 'date'
        }, {
            title: '开庭日期',
            field: 'courtDatetime',
            type: 'date'
        }, {
            title: '开庭地点',
            field: 'courtAddress'
        }, {
            title: '判决书送达时间',
            field: 'judgePdfDeliveryTime',
            type: 'date'
        }, {
            title: '判决书',
            field: 'judgePdf',
            type: 'img'
        }, {
            title: '生效时间',
            field: 'effectiveTime',
            type: 'date'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630521
            });
    }
}

export default litigationAddedit;