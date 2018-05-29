import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/import-apply';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsImportApply, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class ImportApply extends React.Component {
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
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'useDatetime',
            readonly: true
        }, {
            title: '银行欠款',
            field: 'budgetAmount',
            amount: true,
            readonly: true
        }, {
            title: '代偿欠款',
            field: 'budgetAmount',
            amount: true,
            readonly: true
        }, {
            title: '实际预期次数',
            field: 'useDatetime'
        }, {
            title: '实际代偿次数',
            field: 'useDatetime'
        }, {
            title: '押金金额',
            field: 'budgetAmount',
            amount: true,
            readonly: true
        }, {
            title: '扣除违约金额',
            field: 'budgetAmount',
            amount: true,
            required: true
        }, {
            title: '实际退款金额',
            field: 'budgetAmount',
            amount: true,
            readonly: true
        }, {
            title: '结清时间',
            field: 'useDatetime',
            type: 'date',
            required: true
        }, {
            title: '退款开户行',
            field: 'useDatetime',
            required: true
        }, {
            title: '退款户名',
            field: 'useDatetime',
            required: true
        }, {
            title: '退款账号',
            field: 'useDatetime',
            required: true
        }, {
            title: '第二年按公司指定续保',
            field: 'budgetAmount',
            amount: true,
            required: true
        }, {
            title: '第三年按公司指定续保',
            field: 'budgetAmount',
            amount: true,
            required: true
        }, {
            title: '押金单',
            field: 'useDatetime',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '结清证明',
            field: 'useDatetime',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '附件',
            field: 'useDatetime',
            type: 'img'
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
                title: '发送',
                check: true,
                handler: (params) => {
                    this.props.doFetching();
                    let bank = this.props.selectData.receiptBank.find(v => v.code === params.receiptBank);
                    params.receiptAccount = bank.bankcardNumber;
                    params.receiptBank = bank.bankCode;
                    params.buttonCode = 1;
                    fetch(632100, params).then(() => {
                        showSucMsg('操作成功');
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1500);
                        this.props.cancelFetching();
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

export default ImportApply;