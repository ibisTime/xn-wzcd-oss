import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/invoice-enter';
import {
  getQueryString,
  showSucMsg,
  getUserId,
  padLeftZero
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.loanstoolsInvoiceEnter, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class InvoiceEnter extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.hiddenStatus = true;
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
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            readonly: true,
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true,
            required: true,
            formatter: (v, data) => {
                return data.bankSubbranch && (data.bankSubbranch.bank.bankName + '-' + data.bankSubbranch.abbrName);
            }
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            key: 'budget_orde_biz_typer',
            readonly: true,
            required: true,
            onChange: (value) => {
                this.hiddenStatus = value === '1';
            }
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true,
            readonly: true
        }, {
            title: '提车日期',
            field: 'deliveryDatetime',
            type: 'date',
            required: true
        }, {
            title: '发票价',
            field: 'invoicePrice',
            readonly: true,
            onChange: (v) => {
                let money = this.props.pageData.loanAmount;
                this.props.setPageData({
                    number: padLeftZero(money / v)
                });
            },
            amount: true
        }, {
            title: '发票是否正确',
            field: 'isRightInvoice',
            type: 'select',
            data: [{
                key: '0',
                value: '不匹配'
            }, {
                key: '1',
                value: '匹配'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            title: '现发票价',
            field: 'currentInvoicePrice',
            required: true,
            amount: true
        }, {
            title: '准入贷款成数标准',
            field: 'companyLoanCsSection',
            readonly: true
        }, {
            title: '新贷款成数',
            field: 'number',
            readonly: true
        }, {
            title: '发票',
            field: 'invoice',
            required: true,
            type: 'img'
        }, {
            title: '合格证',
            field: 'certification',
            required: true,
            type: 'img'
        }, {
            title: '交强险',
            field: 'forceInsurance',
            required: true,
            type: 'img'
        }, {
            title: '商业险',
            field: 'businessInsurance',
            required: true,
            type: 'img'
        }, {
            title: '机动车登记证书',
            field: 'motorRegCertification',
            required: true,
            hidden: this.hiddenStatus,
            type: 'img'
        }, {
            title: '批单',
            field: 'pdPdf',
            required: true,
            type: 'img'
        }, {
            title: '备注',
            field: 'fbhRemark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
                title: '确认',
                check: true,
                handler: (params) => {
                    params.code = this.code;
                    params.operator = getUserId();
                    this.props.doFetching();
                    fetch(632220, params).then(() => {
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

export default InvoiceEnter;