import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/postloantools/import-dispose';
import {getQueryString, showSucMsg, getUserId, moneyFormat} from 'common/js/util';
import fetch from 'common/js/fetch';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.postloantoolsImportDispose, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class applyGpsAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.budgetOrderCode = getQueryString('budgetOrderCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isSingle = false;
    }

    render() {
        const fields = [{
            title: '不匹配原因',
            field: 'applyUserName',
            type: 'select',
            key: '11',
            formatter: (v, d) => {
                this.isSingle = v === '1';
            },
            readonly: true
        }, {
            title: '导入日期',
            field: 'importDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '客户姓名',
            field: 'realName',
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
            title: '放款日期',
            field: 'fkDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '对应业务',
            field: 'repayBizCode',
            type: 'select',
            pageCode: 630520,
            params: {
                curNodeCodeList: ['020_01']
            },
            keyName: 'code',
            valueName: '{{refCode.DATA}}-{{realName.DATA}}',
            hidden: !this.isSingle,
            required: true
        }, {
            title: '对应业务列表',
            field: '11',
            hidden: this.isSingle,
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                fields: [{
                    title: '业务编号',
                    field: 'code',
                    type: 'select',
                    pageCode: 630520,
                    params: {
                        curNodeCodeList: ['020_01']
                    },
                    keyName: 'code',
                    valueName: '{{refCode.DATA}}-{{realName.DATA}}',
                    required: true,
                    onChange: (v, data, props) => {
                        props.setPageData({
                            code: data.code,
                            realName: data.realName,
                            idNo: data.idNo,
                            amount: moneyFormat(data.amount)
                        });
                    },
                    noVisible: true
                }, {
                    title: '业务编号',
                    field: 'code',
                    hidden: true
                }, {
                    title: '客户姓名',
                    field: 'realName',
                    hidden: true
                }, {
                    title: '身份证号',
                    field: 'idNo',
                    hidden: true
                }, {
                    title: '逾期金额',
                    field: 'amount',
                    hidden: true
                }]
            }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632306,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.code = this.code;
                    param.operator = getUserId();
                    this.props.doFetching();
                    fetch(632301, param).then(() => {
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

export default applyGpsAddedit;
