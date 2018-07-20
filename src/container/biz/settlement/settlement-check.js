import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/settlement-check';
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
    state => state.bizSettlementCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class settlementCheck extends React.Component {
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
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            formatter: (v, d) => {
                return d.repayBiz.loanBankName;
            },
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayBiz.loanAmount);
            },
            readonly: true
        }, {
            title: '逾期记录',
            field: '11',
            amount: 'true',
            readonly: true
        }, {
            title: '代偿记录',
            field: '22',
            amount: 'true',
            readonly: true
        }, {
            title: '扣除违约金额',
            field: 'cutLyDeposit',
            amount: 'true',
            readonly: true
        }, {
            title: '实际退款金额',
            field: 'actualRefunds',
            amount: 'true',
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
            listCode: 632037,
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
            title: '押金单',
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
            title: '审核说明',
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
                fetch(630571, param).then(() => {
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
                fetch(630571, param).then(() => {
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

export default settlementCheck;
