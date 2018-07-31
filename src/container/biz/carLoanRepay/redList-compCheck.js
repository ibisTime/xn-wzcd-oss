import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/redList-compCheck';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizredListCompCheck, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class RedListCompCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.arr = [{
            key: '0',
            value: '否'
        }, {
            key: '1',
            value: '是'
        }];
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
            title: '是否典当行赎回',
            field: 'pawnshopIsRedeem',
            formatter: (v, d) => {
                let index = d.curMonthRepayPlan.pawnshopIsRedeem;
                return this.arr[index].value;
            },
            readonly: true
        }, {
            title: '典当行名称',
            field: 'pawnshopName',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.pawnshopName;
            },
            readonly: true
        }, {
            title: '赎金小写',
            field: 'ransom',
            formatter: (v, d) => {
                return moneyFormat(d.curMonthRepayPlan.ransom);
            },
            readonly: true
        }, {
            title: '收车费用',
            field: 'tsCarAmount',
            formatter: (v, d) => {
                return moneyFormat(d.curMonthRepayPlan.tsCarAmount);
            },
            readonly: true
        }, {
            title: '收款人名称',
            field: 'tsUserName',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.tsUserName;
            },
            readonly: true
        }, {
            title: '收款人开户行',
            field: 'tsBankName',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.tsBankName;
            },
            readonly: true
        }, {
            title: '收款人开户支行',
            field: 'tsSubbranch',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.tsSubbranch;
            },
            readonly: true
        }, {
            title: '收款人账号',
            field: 'tsBankcardNumber',
            formatter: (v, d) => {
                return d.curMonthRepayPlan.tsBankcardNumber;
            },
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
                    title: '审核说明',
                    field: 'approveNote'
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
            title: '申请说明',
            field: 'remark',
            type: 'textarea',
            normalArea: true,
            required: true
        }];
        return this
            .props
            .buildDetail({
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
                    fetch(630552, param).then(() => {
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
                    fetch(630552, param).then(() => {
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

export default RedListCompCheck;
