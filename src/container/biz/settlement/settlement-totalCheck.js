import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/settlement-totalCheck';
import {
    getQueryString,
    dateTimeFormat,
    moneyFormat,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizSettlementTotalCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class SettlementTotalCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            formatter: (v, d) => {
                return d.user.realName;
            },
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            formatter: (v, d) => {
                return d.user.idNo;
            },
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
            title: '扣除违约金额',
            field: 'cutLyDeposit',
            amount: 'true',
            readonly: true
        }, {
            title: '实际退款金额',
            field: 'actualRefunds',
            formatter: (v, d) => {
                return moneyFormat(d.loanAmount - d.cutLyDeposit);
            },
            readonly: true
        }, {
            title: '结清时间',
            field: 'settleDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '退款开户行',
            field: 'refundBankSubbranch',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            readonly: true
        }, {
            title: '退款户名',
            field: 'refundBankRealName',
            readonly: true
        }, {
            title: '退款账号',
            field: 'refundBankcard',
            bankCard: true,
            readonly: true
        }, {
            title: '第二年按公司指定续保',
            field: 'secondCompanyInsurance',
            amount: 'true',
            readonly: true
        }, {
            title: '第三年按公司指定续保',
            field: 'thirdCompanyInsurance',
            amount: 'true',
            readonly: true
        }, {
            title: '保证金单',
            field: 'depositReceipt',
            type: 'img',
            readonly: true
        }, {
            title: '结清证明',
            field: 'settleAttach',
            type: 'img',
            readonly: true
        }, {
            title: '备注',
            field: 'remark',
            readonly: true
        }, {
            title: '流程日志',
            field: 'list',
            type: 'o2m',
            listCode: 630176,
            params: {
                refOrder: this.code
            },
            hidden: this.isEntry || this.isCheckFirst || this.isAddedit,
            options: {
                fields: [{
                    title: '操作人',
                    field: 'operatorName'
                }, {
                    title: '开始时间',
                    field: 'startDatetime',
                    type: 'datetime'
                }, {
                    title: '结束时间',
                    field: 'endDatetime',
                    type: 'datetime'
                }, {
                    title: '花费时长',
                    field: 'speedTime'
                }, {
                    title: '审核意见',
                    field: 'dealNote'
                }, {
                    title: '当前节点',
                    field: 'dealNode',
                    type: 'select',
                    listCode: 630147,
                    keyName: 'code',
                    valueName: 'name'
                }]
            }
        }, {
            title: '审核意见',
            field: 'approveNote',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.approveResult = '1';
                param.operator = getUserId();
                this.props.doFetching();
                fetch(630578, param).then(() => {
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
                fetch(630578, param).then(() => {
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

export default SettlementTotalCheck;
