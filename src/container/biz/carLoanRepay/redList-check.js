import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/redList-check';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizredListCheck, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class redListCheck extends React.Component {
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
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBank',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '是否典当行赎回',
            field: 'pawnshopIsRedeem',
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
            readonly: true
        }, {
            title: '典当行名称',
            field: 'pawnshopName',
            readonly: true
        }, {
            title: '赎金小写',
            field: 'ransom',
            amount: true,
            readonly: true
        }, {
            title: '收车费用',
            field: 'tsCarAmount',
            amount: true,
            readonly: true
        }, {
            title: '收款人名称',
            field: 'tsUserName',
            readonly: true
        }, {
            title: '收款人开户行',
            field: 'tsBankName',
            type: 'select',
            listCode: 632037,
            keyName: 'bankCode',
            valueName: 'bankName',
            readonly: true
        }, {
            title: '收款人开户支行',
            field: 'tsSubbranch',
            readonly: true
        }, {
            title: '收款人账号',
            field: 'tsBankcardNumber',
            bankCard: true,
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

export default redListCheck;
