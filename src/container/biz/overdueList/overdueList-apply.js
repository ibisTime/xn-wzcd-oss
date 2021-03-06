import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/overdueList/overdueList-apply';
import {
    getQueryString,
    getUserId,
    showSucMsg,
    moneyFormat,
    moneyUppercase
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizOverdueListApply, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class OverdueListApply extends React.Component {
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
        this.typeList = ['剩余贷款金额', '月供'];
        this.state = {
            type: '',
            amount: '',
            moneyUppercase: '',
            receiptRealName: '',
            receiptBank: '',
            receiptAccount: '',
            isUrgent: ''
        };
    }
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            formatter: (v, d) => {
                return d.repayBiz.budgetOrder.code;
            },
            readonly: true
        }, {
            title: '客户姓名',
            field: 'name',
            readonly: true,
            formatter: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true,
            formatter: (v, d) => {
                return d.user.idNo;
            }
        }, {
            title: '选择代偿预算单',
            field: 'replaceApplyCode',
            type: 'select',
            listCode: 632327,
            keyName: 'code',
            valueName: '{{code.DATA}}-{{receiptRealName.DATA}}',
            onChange: (v, d) => {
                this.setState({
                    type: d.type,
                    amount: moneyFormat(d.amount),
                    moneyUppercase: moneyUppercase(moneyFormat(d.amount)),
                    receiptRealName: d.receiptRealName,
                    receiptBank: d.receiptBank,
                    receiptAccount: d.receiptAccount,
                    isUrgent: d.isUrgent
                });
            },
            required: true
        }, {
            title: '代偿类型',
            field: 'type',
            formatter: (v, d) => {
                return this.typeList[this.state.type];
            },
            readonly: true
        }, {
            title: '预算金额',
            field: 'amount',
            formatter: (v, d) => {
                return this.state.amount;
            },
            readonly: true
        }, {
            title: '预算金额大写',
            field: 'moneyUppercase',
            formatter: (v, d) => {
                return this.state.moneyUppercase;
            },
            readonly: true
        }, {
            title: '收款人姓名',
            field: 'receiptRealName',
            formatter: (v, d) => {
                return this.state.receiptRealName;
            },
            readonly: true
        }, {
            title: '收款人开户行',
            field: 'receiptBank',
            formatter: (v, d) => {
                return this.state.receiptBank;
            },
            readonly: true
        }, {
            title: '收款人账号',
            field: 'receiptAccount',
            formatter: (v, d) => {
                return this.state.receiptAccount;
            },
            readonly: true
        }, {
            title: '是否加急',
            field: 'isUrgent',
            formatter: (v, d) => {
                let index = this.state.isUrgent;
                let isUrgent = this.arr[index].value;
                return isUrgent;
            },
            readonly: true
        }, {
            title: '与我司过往是否有纠纷',
            field: 'isPlatIssue',
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
            title: '代偿后采取的方式',
            field: 'takeWay',
            type: 'select',
            key: 'take_way'
        }, {
            title: '申请代偿理由',
            field: 'applyReason'
        }, {
            title: '暂缓起诉(天)',
            field: 'deferDays',
            number: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630541,
                buttons: [{
                    title: '确定',
                    handler: (param) => {
                        param.bizCode = this.code;
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(632330, param).then(() => {
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

export default OverdueListApply;
